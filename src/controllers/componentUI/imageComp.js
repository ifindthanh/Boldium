/**
 * Created by OS on 4/5/15.
 */
var Comp = require('./component');

var ImageComp = function (args) {
    Comp.call(this, args);
    this.image = args.image;
    this.height = args.height;
    this.title = args.title;
    this.txtLink = args.link;
    this.link = [];
};

ImageComp.prototype.toString = function () {
    return this.super(Comp, 'toString') + " Image: " + this.image +
        " Height: " + this.height + " Title: " + this.title + " Link:" + this.txtLink;
};

ImageComp.prototype.render = function () {
};

ImageComp.prototype = Object.create(Comp.prototype);
ImageComp.prototype.__super__ = Comp;
ImageComp.prototype.constructor = ImageComp;

module.exports = ImageComp;