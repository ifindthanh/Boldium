var template = require('./template'),
    assign = require('./assign');

var Field = function () {
};

Field.prototype.render = function (context, data) {
    var suggestions = [ 'field', 'field_' + this.fieldType, 'type_' + this.type, 'name_' + this.name ];
    if (context) {
        suggestions.push('context_' + context);
    }
    return template(suggestions, assign({
        type: this.type,
        fieldName: this.name,
        data: this.data,
        context: context
    }, data || {}));
};

Field.prototype.unserialize = function (data) {
    this.data = data;
};

Field.prototype.serialize = function () {
    return this.data;
};

Field.prototype.clone = function () {
    var f = new this.constructor();
    f.unserialize(this.serialize());
    return f;
};

module.exports = Field;
