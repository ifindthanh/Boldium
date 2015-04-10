var menu = require('../../../controllers/menu'),
    React = require('react'),
    template = require('../../../controllers/template'),
    db = require('../../../models/db');

var cachedRegexes = {};

var Router = React.createClass({
    getInitialState: function () {
        return this._changeRoutes(true);
    },
    componentDidMount: function () {
        window.addEventListener('hashchange', this._route);
        menu.on('change', this._changeRoutes);
        db.on('put', this._onDbChange);
    },
    componentWillUnmount: function () {
        window.removeEventListener('hashchange', this._route);
        menu.removeListener('change', this._changeRoutes);
        db.removeListener('add', this._onDbChange);
    },
    _onDbChange: function () {
        this.forceUpdate();
    },
    _changeRoutes: function (r) {
        var routes = menu();
        var match = this._match(location.hash.slice(1) || '/', routes);
        match.routes = routes;
        if (r) {
            return match;
        }
        else {
            this.setState(match);
        }
    },
    _match: function (url, routes) {
        routes = routes || this.state.routes;
        var match;
        for (var k in routes) {
            if (routes.hasOwnProperty(k)) {
                if (!cachedRegexes[k]) {
                    cachedRegexes[k] = new RegExp('^' + k.replace('/', '\\/') + '$', 'i');
                }
                if ((match = cachedRegexes[k].exec(url)) && match.length) {
                    match.shift();
                    return { route: k, params: match, url: url };
                }
            }
        }
        return { route: "" };
    },
    _route: function () {
        var match = this._match(location.hash.slice(1) || '/');
        this.setState(match);
    },
    componentWillUpdate: function (newProps, newState) {
        if (newState.route && newState.route != this.state.route && this.props.onChange) {
            this.props.onChange();
        }
    },
    render: function () {
        if (this.state.route) {
            var contents = this.state.routes[this.state.route](this.state.url);
            var pcs = this.state.url.split('/');
            pcs[0] = 'page';
            return template(pcs, { contents: contents });
        }
        return template([ 'page', '404' ]);
    }
});

module.exports = Router;
