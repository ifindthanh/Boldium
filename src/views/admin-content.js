var resolver = require('./../controllers/resolver'),
    db = require('./../models/db'),
    template = require('./../controllers/template'),
    R = require('ramda');
var view = {};

view.data = function (type) {
    return {
        fields: resolver('type', type).type,
        content: db().where({ type: type }).value()
    };
};

view.render = function (type) {
    return template([ 'view', 'admin_content', 'admin_content_' + type ], { data: view.data(type) });
};

view.url = function () {
    return R.reduce(function (acc, type) {
        acc['/admin/' + type] = function () {
            return view.render(type);
        };
        return acc;
    }, {}, R.keys(resolver('type')));
};

module.exports = view;
