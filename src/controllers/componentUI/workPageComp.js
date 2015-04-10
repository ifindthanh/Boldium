/**
 * Created by OS on 4/5/15.
 */
var PageComp = require('./pageComp');

var WorkPageComp = function (args) {
    PageComp.call(this, args);
    this.subName = args.subName;
    this.image = args.image;
};

WorkPageComp.prototype.toString = function () {
    return this.super(PageComp, 'toString') + " Sub Name: " + this.subName +
        " Image: " + this.image;
};

WorkPageComp.prototype.render = function () {
};

WorkPageComp.prototype = Object.create(PageComp.prototype);
WorkPageComp.prototype.__super__ = PageComp;
WorkPageComp.prototype.constructor = WorkPageComp;

module.exports = WorkPageComp;