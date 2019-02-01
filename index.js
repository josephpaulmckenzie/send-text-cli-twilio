const notifier = require('node-notifier');
const path = require('path');
var nc = new notifier.NotificationCenter();

function sendMessage(message) {
    nc.notify({
            title: 'Message Notifaction ',
            subtitle: 'Message from Joe',
            message: message,
            sound: 'Funk',
            wait: true,
            // sound is case sensitive
            reply: "Message Reply"
        },
        function (err, response, metadata) {
            if (err) throw err;
            console.log(`The Response was ${response}`);
        }
    );
}
nc.on('replied', function (obj, options, metadata) {
    console.log('User replied', metadata["activationValue"]);
    sendMessage("Message 2")
    // Lets Send a message back to the user
});

sendMessage("Message 1")