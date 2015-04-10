var template = require('../template'),
    field = require('../field'),
    assign = require('../assign');

var Text = function () {
}; // constructor is unused
assign(Text.prototype, field.prototype, true);
module.exports = Text;
