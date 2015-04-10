/**
 * Created by OS on 4/7/15.
 */
var Comp = require('./component');

var WorkOverviewComp = function (args) {
    Comp.call(this, args);
    this.categoryIds = args.categories;
    this.categories = [];
};

WorkOverviewComp.prototype.toString = function () {
    return this.super(Comp, 'toString') + " Categories: " + this.categoryIds;
};

WorkOverviewComp.prototype.render = function () {
};

WorkOverviewComp.prototype = Object.create(Comp.prototype);
WorkOverviewComp.prototype.__super__ = Comp;
WorkOverviewComp.prototype.constructor = WorkOverviewComp;

module.exports = WorkOverviewComp;