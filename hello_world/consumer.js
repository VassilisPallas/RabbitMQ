#!/usr/bin/env node

var amqplib = require('amqplib/callback_api');

amqplib.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'helloQueue';
        ch.assertQueue(q, {durable: false});
        ch.consume(q, function (message) {
            console.log(message.content.toString());
        }, {noAck: true});
    });
});