var assign = require('../assign'),
    field = require('../field');

var Enum = function () {
}; // constructor is unused
assign(Enum.prototype, field.prototype, true);
module.exports = Enum;
