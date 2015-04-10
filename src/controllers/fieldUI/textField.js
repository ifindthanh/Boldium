/**
 * Created by OS on 4/6/15.
 */
var Field = require('./field');

var TextField = function (data, fieldName) {
    Field.call(this, data, fieldName);
};

TextField.prototype.render = function () {

};

TextField.prototype = Object.create(Field.prototype);
TextField.prototype.__super__ = Field;
TextField.prototype.constructor = TextField;