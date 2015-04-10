/**
 * Created by OS on 3/28/15.
 */
var images = require('../../dbCfg.json').data.images;
var formidable = require('formidable');
var shell = require('../commons/shell');

//TODO check image and file is existed
module.exports = {
    uploadImage: function (req, dirName, cb) {
        var destFolder = dirName + '/' + images.original.dir;
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            shell('mv', [ files.file.path, destFolder + files.file.name], cb);
        });
    }
};