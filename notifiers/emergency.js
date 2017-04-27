var database = require('../app').database;
var userModels = database.collection('tb_user');


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
    var req = JSON.parse(msg.content.toString());
    getNotifier().then(function (users) {
        console.log(users);
       if(users.length > 0){

       }
    }).catch(function (err) {
        console.log(err);
    });
}


module.exports = {
    sendToNotifier:sendToNotifier
};