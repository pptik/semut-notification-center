var database =  require('../app').database;

var fcm_setup = require('../setup').fcm_setup;

var FCM = require('fcm-push');
var serverkey = fcm_setup.server_key;
var fcm = new FCM(serverkey);
var message = {
    to : fcm_setup.device_key_test,
        collapse_key : fcm_setup.client_app_bundle,
        data : {
            key_1 : 'sacadddcsd',
            key_2 : 'ddsadascdcsdcsdcs'
    },
    notification : {
        title : 'Title of the notification',
            body : 'Body of the notification'
    }
};

fcm.send(message, function(err,response){
    if(err) {
        console.log("Something has gone wrong ! "+err);
    } else {
        console.log("Successfully sent with resposne :",response);
    }
});