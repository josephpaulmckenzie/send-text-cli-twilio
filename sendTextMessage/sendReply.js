#!/usr/bin/env node
require('dotenv').config();

const accountSid =process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

function sendReply(toNumber, replyMessage) {
    const fs = require('fs');

    fs.appendFile('../TextLog.csv', "To: " + "," + fromNumber + "," + "Message: " + "," + replyMessage + "\r\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    client.messages
        .create({
            body: replyMessage,
            from: process.env.fromNumber,
            to: toNumber
        })

        .then(message => console.log(message.sid))
        .done();
}

sendReply(process.argv[2], process.argv[3]);