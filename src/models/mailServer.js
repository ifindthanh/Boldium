/**
 * Created by OS on 4/4/15.
 */

var mailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');
var serverCfg = require('../../serverCfg.json');
var mailServer = serverCfg.mailServer;
var smtpCfg = mailServer["SMTP"];

// TODO Singleton pattern
module.exports = exports = new MailServer();

function MailServer() {
    this.transporterSMTP = mailer.createTransport(smtpTransport(smtpCfg));
    this.transporterSMTP = mailer.createTransport({
        service: 'Gmail',
        auth: smtpCfg.auth
    });
};

/**
 * User send feedback in contact form.
 * @param mail
 * @param cb
 */
MailServer.prototype.feedback = function(mail, cb){
    this.transporterSMTP.sendMail({
        from: smtpCfg.auth.user,
        to: mail.to,
        subject: mail.subject,
        text: mail.body
    }, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
};

/**
 * Send mail automatically to subscriber.
 * @param mail
 * @param cb
 */
MailServer.prototype.subscribe = function(mail, cb){
};