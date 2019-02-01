var app = require("express")();
require('dotenv').config();

var bodyParser = require("body-parser");
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post("/sms", function (req, res) {
    var message = req.body.Body;
    console.log(message); // the message body
    var fromNumber = req.body.From;
    console.log(fromNumber); // the number that sent the message
    const fs = require('fs');

    fs.appendFile('TextLog.csv', "From: " + "," + fromNumber + "," + "Message: " + "," + message + "\r\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    sendmessage(message, fromNumber)
});

app.listen(1337); // listens on port 3000

function sendmessage(message, fromNumber) {
    const notifier = require('node-notifier');
    const path = require('path');
    var nc = new notifier.NotificationCenter();
    console.log("The incoming Message is: ", message);

    nc.notify({
            title: 'Message Notification ',
            subtitle: `Message from ${fromNumber}`,
            message: message,
            sound: 'Funk',
            // sound is case sensitive
            wait: true,
            timeout: 0,
            // Set to high number or nothing at all to allow reply to wait longer?
            reply: "Message Reply"
        },
        function (err, response, metadata) {
            if (err) console.log(err);
            console.log(`The Response was ${response}`);
        }
    );

    nc.on('replied', function (obj, options, metadata) {
        sendReply(metadata["activationValue"],fromNumber)
        console.log('I replied', metadata["activationValue"]);
        // Lets Send a message back to the user
    });
}
const accountSid =process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

function sendReply(replyMessage,fromNumber) {

    const fs = require('fs');

    fs.appendFile('TextLog.csv', "To: " + "," + fromNumber + "," + "Message: " + "," + replyMessage + "\r\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    client.messages
        .create({
            body: replyMessage,
            from: process.env.fromNumber,
            to: `${fromNumber}`
        })
        .then(message => console.log(message.sid))
        .done();
}