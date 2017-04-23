#!/usr/bin/env node

var amqplib = require('amqplib/callback_api');

amqplib.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'helloQueue';
        ch.assertQueue(q, {durable: true});
        // don't dispatch a new message to a worker until it has processed and acknowledged the previous one
        ch.prefetch(1);
        ch.consume(q, function (message) {
            /*
             We send a message with dots, each dot is one sec.
             We will use the timeout method to pretend we are busy in a long time
             running task
             */
            var secs = message.content.toString().split('.').length - 1;
            setTimeout(function () {
                console.log(message.content.toString());
                ch.ack(message);
            }, secs * 1000);
        }, {noAck: false});
        // noAck is message acknowledgments, to turn them on we define this as false, or just skip the options
        // if noAck is enabled, we make sure that the message is never lost if the worker dies
    });
});