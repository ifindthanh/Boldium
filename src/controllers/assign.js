module.exports = function (to, from, noOverride) {
    var keys = Object.keys(Object(from));

    for (var i = 0; i < keys.length; i++) {
        if (!noOverride || !to[keys[i]]) {
            to[keys[i]] = from[keys[i]];
        }
    }

    return to;
};