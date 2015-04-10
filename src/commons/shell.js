/**
 * Created by OS on 3/28/15.
 */

var spawn = require('child_process').spawn;

function shell(cmd, args, cb) {
    var data = "", err = "";
    var s = spawn(cmd, args);
    s.stdout.on('data', function (d) {
        data += d;
    });
    s.stderr.on('data', function (d) {
        console.log(d);
        err += d;
    });
    s.on('close', function (code) {
        if (!cb) {
            return;
        }
        if (code > 0) {
            cb(err);
        }
        else {
            cb(null, data);
        }
    });
}

module.exports = shell;