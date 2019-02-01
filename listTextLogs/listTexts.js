#!/usr/bin/env node


function readTextLog() {

    var xlsx = require('node-xlsx').default
    var workSheetsFromFile = xlsx.parse(`${__dirname}/../TextLog.csv`);
    var ws = workSheetsFromFile[0]["data"]

    for (var i = 0, len = ws.length; i < len; i++) {

        if (ws[i][0] != undefined) {

            var toOrFrom = ws[i][0];
            var phoneNumber = ws[i][1];
            var message = ws[i][2];
            var messageText = ws[i][3];
            console.log(toOrFrom + phoneNumber + " " + message + " " + messageText)
        }
    }
}

readTextLog();