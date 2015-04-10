/**
 * Created by OS on 4/5/15.
 */

var Component = function (args) {
    this.id = args.id;
    this.type = args.type;
};

Component.prototype.render = function () {
};

Component.prototype.toString = function () {
    return "ID: " + this.id + " - Type: " + this.type;
};

Component.prototype.super = function (clazz, functionName) {
    var args = Array.prototype.slice.call(arguments, 1);
    clazz.prototype.__super__.prototype[functionName].apply(this, args);
};

module.exports = Component;