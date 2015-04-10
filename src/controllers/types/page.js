var Type = require('../type');

module.exports = Type({
    name: 'page',
    fields: {
        name: {
            type: 'text'
        },
        path: {
            type: 'text'
        },
        modules: {
            type: 'references',
            noAdmin: true
        }
    },
    viewUrl: function () {
        return this.path.data;
    },
    editUrl: function () {
        return '/admin/page/' + this.id + '/edit';
    }
});
