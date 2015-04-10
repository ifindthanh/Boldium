var resolver = require('./resolver'),
    React = require('react');

var _templateCache = {};

function _template(name, vars) {
    if (typeof _templateCache[name] == 'undefined') {
        var t = resolver('template', name);
        _templateCache[name] = t ? React.createFactory(t) : null;
    }
    if (_templateCache[name]) {
        return _templateCache[name](vars || {});
    }
}

/**
 * render a template.
 */
function template(suggestions, vars) {
    if (typeof suggestions == 'string') {
        return _template(suggestions, vars);
    }
    else if (suggestions.length == 1) {
        return _template(suggestions[0], vars);
    }

    var total = Math.pow(2, suggestions.length - 1) - 1;
    for (var mask = total; mask >= 0; mask--) {
        var result = suggestions[0], i = suggestions.length;
        for (var i = 0; i < suggestions.length; i++) {
            if ((mask & (1 << i)) !== 0) {
                result += '--' + suggestions[i + 1];
            }
        }
        var t;
        if ((t = _template(result, vars))) {
            return t;
        }
    }
}

module.exports = template;
