var database = require('../app').database;
var userModels = database.collection('tb_user');
var fcm_setup = require('../setup').fcm_setup;
var FCM = require('fcm-push');
var serverkey = fcm_setup.server_key;
var fcm = new FCM(serverkey);


function getNotifier() {
    return new Promise(function (resolve, reject) {
        var query = {
            ID_role : 5,
            PushID: { $ne: 'no id' }
        };
        userModels.find(query).toArray(function (err, item) {
           if(err) reject(err);
           else resolve(item);
        });
    });
}


function sendToNotifier(msg) {
    msg = JSON.parse(msg.content.toString());
    getNotifier().then(function (users) {
       if(users.length > 0){
            users.forEach(function (user) {
               sendViaFCM(user, msg);
            });
       }
    }).catch(function (err) {
        console.log(err);
    });
}

function sendViaFCM(user, msg) {
    var message = {
        to : user['PushID'],
        collapse_key : fcm_setup.client_app_bundle,
        data : {
            type : require('../setup').broker_setup.states.emergency_notification,
            message: msg
        },
        notification : {
            title : 'Pesan Darurat!',
            body : 'Pesan darurat diterima, '
        }
    };

    fcm.send(message, function(err,response){
        if(err) {
            console.log("Something has gone wrong ! "+err);
        } else {
            console.log("Successfully sent with resposne :",response);
        }
    });
}

module.exports = {
    sendToNotifier:sendToNotifier
};


