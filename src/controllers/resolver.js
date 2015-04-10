var R = require('ramda'),
    fs = require('fs'),
    cache = {};

module.exports = function (type, name) {
    if (name) {
        if (cache[type][name]) {
            return require(cache[type][name]);
        }
        else {
            return;
        }
    }
    else {
        return R.mapObj(require, cache[type]);
    }
};

if (typeof window === 'undefined') {
    var types = [ 'controllers/types', 'controllers/fields', 'views' ],
        searchPaths = [ __dirname + '/'];
    types.forEach(function (type) {
        cache[type] = {};

        searchPaths.forEach(function (searchPath) {
            var dir = searchPath + type;

            try {
                var files = fs.readdirSync(dir).forEach(function (f) {
                    var pcs = f.split('.'),
                        ext = pcs.pop(),
                        name = pcs.join('.');
                    if (ext == 'js' || ext == 'jsx') {
                        cache[type][name] = dir + '/' + f;
                    }
                });
            }
            catch (e) {
            }
        });
    });
}
else {
    // This is really evil...
    (function (require) {
        cache = {
            field: R.mixin(require(__dirname + '/controllers/fields/*.js', { hash: true })),
            type: R.mixin(require(__dirname + '/controllers/types/*.js', { hash: true })),
            template: R.mixin(
                require(__dirname + '/views/components/*.jsx', { hash: true }),
                require(__dirname + '/views/components/admin/*.jsx', { hash: true }))
        };
    })(R.identity);
}
