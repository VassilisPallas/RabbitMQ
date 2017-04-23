#!/usr/bin/env node

var amqplib = require('amqplib/callback_api');

amqplib.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'helloQueue';
        var message = process.argv.slice(2).join(' ') || 'Hello World...';
        ch.assertQueue(q, {durable: false});
        // is durable is true, when RabbitMQ server crashes or stops, the messages will stay in the queue
        ch.sendToQueue(q, new Buffer(message), {persistent: true});
    });
});