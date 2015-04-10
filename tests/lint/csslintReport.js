/**
 * Created by OS on 3/23/15.
 */
var fs = require('fs'),
    xml = require('../../src/commons/encodeXML'),
    config = require('../../buildCfg.json');

var reporter = function (file) {
    "use strict";
    var out = [];
    out.push("<?xml version='1.0' encoding='utf-8'?>");
    out.push("<csslint>");

    var filePath = file.path;
    var fileName = filePath.substr(filePath.lastIndexOf('/') + 1, filePath.length);
    out.push("\t\t<info>" + file.csslint.errorCount + ' errors in ' + filePath + "</info>");
    out.push("\t\t<issues>")
    file.csslint.results.forEach(function (result) {
        var error = result.error;
        out.push("\t\t\t\t<issue line='" + error.line + "' " +
            "severity='" + xml.encode(error.type) + "' " +
            "reason='" + xml.encode(error.message) + "' " +
            "evidence='" + xml.encode(error.evidence) + "' />");
    });
    out.push("\t\t</issues>")
    out.push("</csslint>");

    var path = config.tests.cssReport + '/csslint-report_' + fileName + config.tests.extFile;
    fs.writeFile(path, out.join("\n"), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        }
    );
    return out;
};

module.exports = reporter;