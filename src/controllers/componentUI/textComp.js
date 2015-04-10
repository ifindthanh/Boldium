/**
 * Created by OS on 4/5/15.
 */
var Comp = require('./component');

var TextComp = function (args) {
    Comp.call(this, args);
    this.txtLines = args.lines;
    this.lines = [];
};

TextComp.prototype.toString = function () {
    return this.super(Comp, 'toString') + " Lines: " + this.txtLines;
};

TextComp.prototype.render = function () {
};

TextComp.prototype = Object.create(Comp.prototype);
TextComp.prototype.__super__ = Comp;
TextComp.prototype.constructor = TextComp;

module.exports = TextComp;