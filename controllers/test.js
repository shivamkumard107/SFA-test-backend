var mongoClient = require("mongodb").MongoClient;
/* GET home page. */


var url = require('./../routes/globalAccess.js').baseUrl;
var dbName = require('./../routes/globalAccess.js').dbName;


var getAllJt = function(request, response){

    mongoClient.connect(url, function(err, client){
        var db = client.db(dbName);

        db.collection('JobTicket').find().toArray(function(err, jobTicket){
            if(err) throw err;

            // var timeInMss = Date.now();
            // console.log(timeInMss);
            response.send(jobTicket);
        });

        // client.close();
    });

};

module.exports = {
    getAllJt : getAllJt
};
