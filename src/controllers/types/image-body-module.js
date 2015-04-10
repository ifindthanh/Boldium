var Type = require('../type');

module.exports = Type({
    name: 'image-body-module',
    fields: {
        image: {
            type: 'image'
        },
        height: {
            type: 'text'
        },
        mobileImage: {
            type: 'image'
        },
        mobileHeight: {
            type: 'text'
        },
        title: {
            type: 'text'
        },
        text: {
            type: 'text'
        },
        link: {
            type: 'link'
        }
    }
});
