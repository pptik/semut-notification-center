var mongo_uri = require('../setup').mongo_setup.mongo_uri;
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

function connect() {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(mongo_uri, function(err, database) {
            //assert.equal(null, err);
            if(err) {
                console.log("Connected to server failed");
                reject(err);
            }else {
                console.log("Connected to server");
                resolve(database);
            }
        });
    });
}


module.exports = {
    connect:connect
};