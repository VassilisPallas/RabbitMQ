#!/usr/bin/env node

var amqplib = require('amqplib/callback_api');

amqplib.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'helloQueue';
        ch.assertQueue(q, {durable: false});
        ch.consume(q, function (message) {
            var secs = message.content.toString().split('.'). length - 1;
            setTimeout(function () {
                console.log(message.content.toString());
            }, secs * 1000);
        }, {noAck: true});
    });
});