var channel = require('../app').chnannel;
var setup = require('../setup');
var states = setup.broker_setup.states;
var emergencyNotifier = require('../notifiers/emergency')

const exchangeName = setup.broker_setup.exchange_name;
const queueName = setup.broker_setup.queue_name;
const queueTo = setup.broker_setup.consume_routing_key;

function consume () {
    channel.assertExchange(exchangeName, 'topic', {durable: false});
    channel.prefetch(1);
    channel.assertQueue(queueName, {exclusive: false}, function (err, q) {
        if (err) {
            console.log("error : %s",err);
        } else {
            channel.bindQueue(q.queue, exchangeName, queueTo);
            channel.consume(q.queue, function (msg) {
                console.log(msg.content.toString());
                checkState(msg.fields.routingKey, msg);
            }, {noAck: true});
        }
    });
}

function checkState(type, msg) {
    switch (type){
        case states.emergency_notification:
            console.log('--------------------------------------------');
            console.log('Emergency Notification');
            console.log('--------------------------------------------');
            emergencyNotifier.sendToNotifier(msg);
            break;
    }
}


module.exports = {
    consume:consume
};

