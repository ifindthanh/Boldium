var resolver = require('./resolver'),
    db = require('../models/db'),
    R = require('ramda'),
    assign = require('./assign'),
    events = require('events');

var menuCache = {};
var menu = assign(function () {
    return menuCache;
}, events.EventEmitter.prototype);

var buildMenus = function () {
    var menuItems = {};

    function getUrl(obj) {
        if (!obj.url) {
            return;
        }
        assign(menuItems, typeof obj.url == 'function' ? obj.url() : obj.url);
    }

    // Content
    db().value().forEach(getUrl);

    // Views
    R.values(resolver('view')).forEach(getUrl);

    menuCache = menuItems;
    menu.emit('change');
};

db.on('put', buildMenus);

buildMenus();

module.exports = menu;
