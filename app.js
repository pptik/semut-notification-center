var mongo = require('./database/mongo');
var cluster = require('cluster');
var amqp = require('amqplib/callback_api');
var broker_uri = require('./setup').broker_setup.broker_uri;

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });

}else {
    connectToBroker();
    console.log('Worker %d running!', cluster.worker.id);
}

function connectToBroker() {
    amqp.connect(broker_uri, function (err, conn) {
        if (err) {
            console.log("connect to broker err %s", err);
            console.log("retry to connect in 5 secs ...");
            setTimeout(function () {
                connectToBroker();
            }, 5000);
        } else {
            conn.createChannel(function (err, ch) {
                if (err) {
                    console.log("create channel err %s", err);
                } else {
                    console.log("success create channel ");
                    exports.chnannel = ch;
                    mongo.connect().then(function (database) {
                        exports.database = database;
                        //listen incoming msg
                        require('./services/notification_listener').consume();
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            });
        }
    });
}


/*
mongo.connect().then(function (database) {
    exports.database = database;
    require('./tests/fcm_send_msg');
}).catch(function (err) {
    console.log(err);
});
    */