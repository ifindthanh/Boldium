var Type = require('../type');

module.exports = Type({
    name: 'work-category',
    fields: {
        name: {
            type: 'text'
        },
        items: {
            type: 'references',
            noAdmin: true
        }
    },
    url: function () {
        return {};
    }
});
