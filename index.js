const cron = require("node-cron");
const express = require("express");
const rp = require('request-promise');


const url = process.env.URL1;
const emails = process.env.EMAIL;
const SMS_AUTH_KEY = process.env.SMS_AUTH_KEY;
const phone_number = process.env.PHONE;


const $ = require('cheerio');

const { sendEmail } = require("./mailer");


var sent_email = false;
var sent_sms = false;

app = express();

cron.schedule(`*/${process.env.INTERVAL || 30} * * * * *`, function () {

    rp(url)
        .then(async function (html) {
            //success!
            if ($('.action-book > .more-showtimes > .showtimes', html).text() == 'Book Tickets') {


                try {
                    await sendMail();
                    sent_email = true;
                } catch (err) {
                    console.log("Error in sending the email ", JSON.stringify(err));
                }
                try {
                    await sendSMS("Advance Booking Started!");
                    sent_sms = true;
                } catch (err) {
                    console.log("Error in sending the email ", JSON.stringify(err));
                }

                if (sent_email && sent_sms) {
                    process.exit(0); // NOW I CAN DIE :P
                }

            }
            else {
                console.log("NO LUCK, BRO!");
            }


        })
        .catch(function (err) {
            //handle error
            console.log("err", err, JSON.stringify(err));
        });
});

async function sendMail(msg) {
    await sendEmail(emails, msg, 'Open BMS ASAP');
}


function sendSMS(msg) {
    let MSG = `<MESSAGE><AUTHKEY>${SMS_AUTH_KEY}</AUTHKEY><SENDER>OTPSMS</SENDER><CAMPAIGN>XML API</CAMPAIGN><COUNTRY>91</COUNTRY><SMS TEXT='${msg}' ><ADDRESS TO='${phone_number}'></ADDRESS></SMS></MESSAGE>`
    return rp.post("https://control.msg91.com/api/postsms.php", {
        headers: {
            "content-type": "application/xml",
            'User-Agent': 'Request-Promise',
            'Content-Length': Buffer.byteLength(MSG)
        },
        body: MSG
    })
}

app.listen(3009);