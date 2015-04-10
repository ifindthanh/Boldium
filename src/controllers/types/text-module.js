var Type = require('../type');

module.exports = Type({
    name: 'text-module',
    fields: {
        lines: {
            type: 'references',
            options: { types: [ 'line' ] }
        }
    }
});
