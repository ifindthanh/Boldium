/**
 * Created by OS on 4/5/15.
 */
var Comp = require('./component');

var PageComp = function (args) {
    Comp.call(this, args);
    this.name = args.name;
    this.path = args.path;
    this.subModules = args.modules;
};

PageComp.prototype.toString = function () {
    return this.super(Comp, 'toString') + " Name: " + this.name +
        " Path: " + this.path + " Sub modules: " + this.subModules;
};

PageComp.prototype.render = function () {
};

PageComp.prototype = Object.create(Comp.prototype);
PageComp.prototype.__super__ = Comp;
PageComp.prototype.constructor = PageComp;

module.exports = PageComp;