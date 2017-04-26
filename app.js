var mongo = require('./database/mongo');
var cluster = require('cluster');

/*
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
    mongo.connect().then(function (database) {
        exports.database = database;
        require('./tests/fcm_send_msg');
    }).catch(function (err) {
        console.log(err);
    });

    console.log('Worker %d running!', cluster.worker.id);
}*/

mongo.connect().then(function (database) {
    exports.database = database;
    require('./tests/fcm_send_msg');
}).catch(function (err) {
    console.log(err);
});