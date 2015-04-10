/**
 * Created by OS on 4/5/15.
 */
var Comp = require('./component');

var LinkComp = function (args) {
    Comp.call(this, args);
    this.reference = args.reference;
    this.text = args.text;
};

LinkComp.prototype.toString = function () {
    return this.super(Comp, 'toString') + " Reference: " + this.reference + " Text:" + this.text;
};

LinkComp.prototype.render = function () {

};

LinkComp.prototype = Object.create(Comp.prototype);
LinkComp.prototype.__super__ = Comp;
LinkComp.prototype.constructor = LinkComp;

module.exports = LinkComp;