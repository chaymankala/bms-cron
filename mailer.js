"use strict";
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    // service: 'gmail',
    pool: true,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: "true",
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


function sendEmail(to, subject, message) {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: '"Your Well-Wisher? LOL" <hello@lol.com>', // sender address
            to: to, // list of receivers
            subject: subject || "Hello", // Subject line
            html: message // plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log("Error Occured in sending mail to : ", to);
                return reject(err);
            } else {
                return resolve(err);
            }
        });
    });
}

module.exports = {
    sendEmail
};
