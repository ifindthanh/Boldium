/**
 * Created by OS on 4/6/15.
 */
var Field = require('./field');

var LinkField = function (data, fieldName, context) {
    Field.call(this, data, fieldName, context);
};

LinkField.prototype.render = function () {

};

LinkField.prototype = Object.create(Field.prototype);
LinkField.prototype.__super__ = Field;
LinkField.prototype.constructor = LinkField;