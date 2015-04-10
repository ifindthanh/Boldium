/**
 * Created by OS on 3/23/15.
 */
var allowable = require('../../dbCfg.json').data.images.allowable;
var del = require('del'),
    readChunk = require('read-chunk'),
    imageType = require('image-type');

module.exports = {
    del: function (dirs) {
        del(dirs, function (err, deletedFiles) {
            if (err) {
                console.error(err);
            }
            console.log('Files deleted:', deletedFiles.join(', '));
        });
    },

    checkImage: function (file) {
        var buffer = readChunk.sync(file, 0, 12);
        var mime = imageType(buffer);
        if (mime == null || !allowable[mime.ext]) {
            return null;
        }
        return mime;
    }
};