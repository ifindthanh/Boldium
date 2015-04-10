var Type = require('../type'),
    db = require('../../models/db');

module.exports = Type({
    name: 'work-page',
    fields: {
        name: {
            type: 'text'
        },
        subname: {
            type: 'text'
        },
        image: {
            type: 'image',
            noAdmin: true
        },
        modules: {
            type: 'references',
            noAdmin: true
        }
    },
    viewUrl: function () {
        return '/work/' + (this.name.data || '').replace(/[^A-Za-z0-9]+/g, '-').toLowerCase()
            + '-' + (this.subname.data || '').replace(/[^A-Za-z0-9]+/g, '-').toLowerCase();
    },
    editUrl: function () {
        return '/admin/work/' + this.id + '/edit';
    }
});
