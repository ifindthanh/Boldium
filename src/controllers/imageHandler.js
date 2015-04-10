/**
 * Created by OS on 3/28/15.
 */
var images = require('../../dbCfg.json').data.images;
var fs = require('fs');
var shell = require('./../commons/shell');
var fileUtils = require('./../commons/fileUtils'),
    pathUtils = require('./../commons/pathUtils');

module.exports = {
    getImage: function (dirName, presetOption, fileName, cb) {
        var preset = images[presetOption];
        if (!preset/* || presetOption == 'original'*/) {
            cb('Preset is not valid!');
            return;
        }
        var srcFile = pathUtils.append(dirName, images.original.dir) + fileName;
        var destFile = pathUtils.append(dirName, preset.dir) + fileName;
        fs.exists(destFile, function (exists) {
            var mime;
            if (exists) {
                mime = fileUtils.checkImage(destFile);
                if (mime != null) {
                    return cb(null, destFile, mime.mime);
                }
            }
            fs.exists(srcFile, function (exists) {
                if (!exists) {
                    cb('File not found!');
                    return;
                }
                mime = fileUtils.checkImage(srcFile);
                if (mime == null) {
                    cb('File is not valid!');
                    return;
                }
                require('./imageHandler.js').resize(dirName, preset, srcFile, destFile, null);
                return cb(null, destFile, mime.mime);
            });
        });
    },

    resize: function (dirName, preset, srcFile, destFile, cb) {
        shell('convert', [
            srcFile,
            '-resize', preset.width + 'x' + preset.height + '^',
            '-gravity', 'Center',
            '-crop', preset.width + 'x' + preset.height + '+0+0',
            destFile
        ], cb);
    }
};