var buildCfg = require('../buildCfg.json');
var serverCfg = require('../serverCfg.json');
var dbCfg = require('../dbCfg.json');

var fs = require('fs'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io'),
    debug = require('debug')('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var R = require('ramda');

//Controller
var imageHandler = require('./controllers/imageHandler'),
    upload = require('./controllers/upload'),
    pathUtils = require('./commons/pathUtils');

//Deployment
var deploy = serverCfg.deployment;
var env = deploy[process.argv[2] || process.env.NODE_ENV || 'DEV'];

//Database
var company = require('./models/companyInfo');
var filterDB = require('./models/filterDB');
var emailHandler = require('./controllers/emailHandler');
var dataFile = pathUtils.append(__dirname, dbCfg.data.dataFile);
var db = JSON.parse(fs.readFileSync(dataFile));

var root = pathUtils.append(__dirname, buildCfg.www.dir.root);

debug('booting');
server.listen(env.port);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

io.on('connection', function (socket) {
    //TODO log later using logger.js
    socket.on('init', function (page) {
        socket.emit('common', {'info': company, 'title': company.getTitle(page)});
        //TODO callback is better
        var data = filterDB.filterByComponent(page, db);
        socket.emit('content', {'data': data});
    });
    socket.on('put', function (datum) {
        socket.broadcast.emit('put', datum);
        db[datum.id] = datum;
        fs.writeFile(dataFile, JSON.stringify(data), function (err) {
            if (err) {
                console.log(err);
            }
        })
    });
});

function handleRequest(req, res, next, page) {
    debug(req.method + ' ' + req.url);
    fs.readFile(pathUtils.append(root, buildCfg.www.file.index), function (err, file) {
        if (err) {
            return next(err);
        }
        res.status(200).send(String(file).replace('{{page}}', page));
    })
}

app.get('/', function (req, res, next) {
    handleRequest(req, res, next, 'home');
});

app.get('/work', function (req, res, next) {
    handleRequest(req, res, next, 'work');
});

app.get('/work/:page', function (req, res, next) {
    handleRequest(req, res, next, req.param('page'));
});

app.get('/about', function (req, res, next) {
    handleRequest(req, res, next, 'about');
});

app.get('/thanks', function (req, res, next) {
    handleRequest(req, res, next, 'thanks');
});

app.post('/doContact', function (req, res, next) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    //TODO revert after have email
    //    emailHandler.send(req.body.name, req.body.email, req.body.message);
    res.redirect('/thanks');
});

app.post('/image', function (req, res, next) {
    upload.uploadImage(req, __dirname, serve);
    function serve(error, destFile, mime) {
        res.status(200).send('OK');
    }
});

app.get('/image/:preset/:image', function (req, res, next) {
    var presetOption = req.param('preset');
    var filename = req.param('image');
    imageHandler.getImage(__dirname, presetOption, filename, serve);
    function serve(error, destFile, mime) {
        if (error) {
            next(error);
            return;
        }
        fs.readFile(destFile, function (err, file) {
            if (err) {
                return next(err);
            }
            res.set('content-type', mime);
            res.status(200).send(file);
        });
    }
});

app.use(express.static(root));