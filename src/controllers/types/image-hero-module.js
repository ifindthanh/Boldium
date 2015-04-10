var Type = require('../type');

module.exports = Type({
    name: 'image-hero-module',
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
        link: {
            type: 'link'
        }
    }
});
