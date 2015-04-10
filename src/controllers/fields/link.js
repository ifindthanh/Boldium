var template = require('../template'),
    field = require('../field'),
    assign = require('../assign'),
    db = require('../../models/db');

var Link = function () {
}; // constructor is unused

Link.prototype.serialize = function () {
    return { reference: this.data.reference, text: this.data.text };
};
Link.prototype.unserialize = function (data) {
    if (!data) {
        data = {};
    }
    this.data = { reference: data.reference, text: data.text };
};
Link.prototype.loadUrl = function () {
    return this.data && this.data.reference && db().get(this.data.reference).value() && db().get(this.data.reference).value().viewUrl() ?
        db().get(this.data.reference).value().viewUrl() : null;
};
Link.prototype.render = function (context, data) {
    var suggestions = [ 'field', 'field_link', 'type_' + this.type, 'name_' + this.name ];
    if (context) {
        suggestions.push('context_' + context);
    }
    return template(suggestions, assign({
        type: this.type,
        fieldName: this.name,
        data: this.data,
        url: this.loadUrl(),
        context: context
    }, data || {}));
};

assign(Link.prototype, field.prototype, true);
module.exports = Link;
