var template = require('../template'),
    field = require('../field'),
    assign = require('../assign'),
    db = require('../../models/db');

var identity = function (x) {
    return x;
};

var References = function () {
}; // constructor is unused

References.prototype.serialize = function () {
    return (this.data || []).slice(0);
};
References.prototype.unserialize = function (data) {
    this.data = (data || []).slice(0).filter(identity);
};
References.prototype.load = function () {
    return this.data.map(function (id) {
        return db().get(id).value();
    });
};
References.prototype.render = function (context, data) {
    var suggestions = [ 'field', 'field_references', 'type_' + this.type, 'name_' + this.name ];
    if (context) {
        suggestions.push('context_' + context);
    }
    return template(suggestions, assign({
        type: this.type,
        fieldName: this.name,
        data: this.data,
        referenced: this.load(),
        context: context
    }, data || {}));
};


assign(References.prototype, field.prototype, true);
module.exports = References;
