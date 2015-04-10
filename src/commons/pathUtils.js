/**
 * Created by OS on 3/31/15.
 */
var src = require('../../buildCfg.json').source;

module.exports = {
    append: function (first, second) {
        return first + '/' + second;
    },

    addSelf: function (dir) {
        return './' + dir;
    },

    addParent: function (dir, level) {
        if (!level) {
            return '../' + dir;
        }
        var parent = '';
        for (var i = 0; i < level; i++) {
            parent += '../';
        }
        return parent + dir;
    },

    exceptRoot: function(dir){
        return [dir + '/**', '!' + dir];
    }
};