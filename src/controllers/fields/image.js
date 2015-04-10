var template = require('../template'),
    field = require('../field'),
    assign = require('../assign'),
    db = require('../../models/db'),
    images = require('../../../dbCfg.json').data.images;

var Image = function () {
}; // constructor is unused

/*
 Image.prototype.serialize = function() {
 return { fileName: this.data.fileName, name: this.data.name };
 };
 Image.prototype.unserialize = function(data) {
 this.data = data;
 };
 */
Image.prototype.getUrl = function (preset) {
    var presetOption = images[preset] || images['original'];
    return '/image/' + preset + '/' + this.data;
};
Image.prototype.render = function (context, data) {
    data = data || {};
    var preset = data.preset || (context == 'edit' ? 'thumbnail' : 'original');
    var width, height;
    if (images[preset]) {
        width = images[preset].width;
        height = images[preset].height;
    }
    var suggestions = [ 'field', 'field_image', 'type_' + this.type, 'name_' + this.name ];
    if (context) {
        suggestions.push('context_' + context);
    }
    return template(suggestions, assign({
        type: this.type,
        fieldName: this.name,
        data: this.data,
        url: this.getUrl(preset),
        width: width,
        height: height,
        context: context
    }, data));
};
Image.prototype.upload = function (file, cb) {
    var self = this;
    var request = new XMLHttpRequest();
    request.open('POST', '/image', true);
    request.onload = function () {
        self.unserialize(file.name);
        cb();
    };
    // request.onerror = console.log;

    var formData = new FormData();
    formData.append('file', file, file.name);

    request.send(formData);
};

assign(Image.prototype, field.prototype, true);
module.exports = Image;
