/**
 * Created by OS on 4/6/15.
 */
var Field = require('./field');
var images = require('../../../dbCfg.json').data.images;

var ImageField = function (data, fieldName, context, preset) {
    Field.call(this, data, fieldName, context);
    var presetOption = images[preset] || images['original'];
    this.url = '/image/' + preset + '/' + this.data;
    this.width = presetOption.width;
    this.height = presetOption.height;
};

ImageField.prototype.render = function () {

};

ImageField.prototype = Object.create(Field.prototype);
ImageField.prototype.__super__ = Field;
ImageField.prototype.constructor = ImageField;