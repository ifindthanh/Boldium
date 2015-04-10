var Type = require('../type');

module.exports = Type({
    name: 'line',
    fields: {
        title: {
            type: 'text'
        },
        text: {
            type: 'text'
        },
        size: {
            type: 'enum',
            options: { choices: [ 'large', 'small' ] }
        }
    }
});
