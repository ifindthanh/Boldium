/**
 * Created by OS on 3/23/15.
 */
var pairs = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
};

module.exports = {
    encode: function (s) {
        for (var r in pairs) {
            if (typeof(s) !== "undefined") {
                s = s.replace(new RegExp(r, "g"), pairs[r]);
            }
        }
        return s || "";
    },

    decode: function (s) {

    }
};