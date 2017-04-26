var mongo = require('./database/mongo');


mongo.connect().then(function (database) {

}).catch(function (err) {
   console.log(err);
});