#!/usr/bin/env node

var amqplib = require('amqplib/callback_api');

amqplib.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'helloQueue';
        ch.assertQueue(q, {durable: false});
        setInterval(function () {
            ch.sendToQueue(q, new Buffer('Hello World'));
        },2000);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 10000);
});