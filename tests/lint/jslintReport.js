var fs = require('fs'),
    xml = require('../../src/commons/encodeXML'),
    config = require('../../buildCfg.json');
var prefixFile = '/jslint_';

var reporter = function (results) {
    "use strict";
    var out = [];
    out.push("<?xml version='1.0' encoding='utf-8'?>");
    out.push("<jslint>");
    results.forEach(function (result) {
        result.file = result.file.replace(/^\.\//, '');
        var error = result.error;
        out.push("\t<file name='" + result.file + "'>");
        out.push("\t\t<issue line='" + error.line + "' " +
            "char='" + error.character + "' " +
            "severity='" + (error.code ? xml.encode(error.code.charAt(0)) : "") + "' " +
            "reason='" + xml.encode(error.reason) + "' " +
            "evidence='" + xml.encode(error.evidence) + "' />");
        out.push("\t</file>");
    });
    out.push("</jslint>");
    var path = config.tests.jsReport + prefixFile + new Date().getTime() + config.tests.extFile;
    fs.writeFile(path, out.join("\n"), function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log('It\'s saved!');
        }
    );
};

module.exports = reporter;