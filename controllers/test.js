var mongoClient = require("mongodb").MongoClient;
/* GET home page. */


var url = require('./../app.js').baseUrl;


var getAllJt = function(request, response){

    mongoClient.connect(url, function(err, client){
        var db = client.db('SfaDb');

        db.collection('JobTicket').find().toArray(function(err, jobTicket){
            if(err) throw err;

            // var timeInMss = Date.now();
            // console.log(timeInMss);
            response.send(jobTicket);
        });

        client.close();
    });

};

module.exports = {
    getAllJt : getAllJt
};
