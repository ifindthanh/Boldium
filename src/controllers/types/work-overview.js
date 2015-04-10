var Type = require('../type'),
    template = require('../template'),
    db = require('../../models/db');

module.exports = Type({
    name: 'work-overview',
    fields: {
        categories: { type: 'references' }
    },
    viewUrl: function () {
        return '/work';
    },
    editUrl: function () {
        return '/admin/work/edit';
    },
    render: function (context) {
        return template([ 'node', 'type_' + this.type, 'id_' + this.id, 'context_' + context ], {
            type: this._options,
            node: this,
            key: 'node-' + this.id + '-' + context,
            hero: db().get("work-hero").value()
        });
    }
});
