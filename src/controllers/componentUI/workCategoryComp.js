/**
 * Created by OS on 4/7/15.
 */
var Comp = require('./component');

var WorkCategoryComp = function (args) {
    Comp.call(this, args);
    this.name = args.name;
    this.itemIds = args.items;
    this.items = [];
};

WorkCategoryComp.prototype.toString = function () {
    return this.super(Comp, 'toString') + " Name: " + this.name + " Items: " + this.items;
};

WorkCategoryComp.prototype.render = function () {
};

WorkCategoryComp.prototype = Object.create(Comp.prototype);
WorkCategoryComp.prototype.__super__ = Comp;
WorkCategoryComp.prototype.constructor = WorkCategoryComp;

module.exports = WorkCategoryComp;