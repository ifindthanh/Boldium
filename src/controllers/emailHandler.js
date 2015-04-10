/**
 * Created by OS on 3/31/15.
 */
var mailServer = require('../models/mailServer');
var company = require('../models/companyInfo');

// TODO Singleton pattern
module.exports = exports = new EmailHandler();

function EmailHandler() {
}

EmailHandler.prototype.send = function (name, email, message, cb) {
    var mail = generateMail(name, email, message);
    mailServer.feedback(mail, cb);
}

var generateMail = function (name, email, message) {
    var subject = 'Talk -' + encodeURIComponent(name);
    var content = 'Dear ' + encodeURIComponent(company.name) + ',\r\n';
    content += 'My name is ' + encodeURIComponent(name) + ', email: ' + encodeURIComponent(email) + '.\r\n';
    content += 'I would like to share something: ' + encodeURIComponent(message) + '.\r\n';
    return {'to': company.email, 'subject': subject, 'body': content};
};



