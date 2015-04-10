/**
 * Created by OS on 4/5/15.
 */
var Comp = require('./component');

var LineComp = function (args) {
    Comp.call(this, args);
    this.title = args.title;
    this.text = args.text;
    this.size = args.size;
};

LineComp.prototype.toString = function () {
    return this.super(Comp, 'toString') + " Title: " + this.title + " Text:" + this.text + " Size: " + this.size;
};

LineComp.prototype.render = function () {

};

LineComp.prototype = Object.create(Comp.prototype);
LineComp.prototype.__super__ = Comp;
LineComp.prototype.constructor = LineComp;

module.exports = LineComp;