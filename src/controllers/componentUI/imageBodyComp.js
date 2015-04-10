/**
 * Created by OS on 4/5/15.
 */
var ImageComp = require('./imageComp');

var ImageBodyComp = function (args) {
    ImageComp.call(this, args);
    this.text = args.text;
};

ImageBodyComp.prototype.toString = function () {
    return this.super(ImageComp, 'toString') + " Text: " + this.text;
};

ImageBodyComp.prototype.render = function () {

};

ImageBodyComp.prototype = Object.create(ImageComp.prototype);
ImageBodyComp.prototype.__super__ = ImageComp;
ImageBodyComp.prototype.constructor = ImageBodyComp;

module.exports = ImageBodyComp;