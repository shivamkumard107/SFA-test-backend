var mongoDb = require('mongodb');
var mongoClient = mongoDb.MongoClient;
var url = require('./../routes/globalAccess.js').baseUrl;
var dbName = require('./../routes/globalAccess.js').dbName;
var admin = require('./../routes/globalAccess.js').admin;


var postNotice = function (request, response) {

    mongoClient.connect(url, function (err, client) {
       if(err) throw err;

       var db = client.db(dbName);

       console.log('System date is ' + new Date().toString());
       console.log('Received date is ' + new Date(request.body.date).toString());


       var data = {
         title : request.body.title,
         date : new Date(request.body.date),
         body : request.body.body,
         noticeBy :   request.body.noticeBy
       };

        console.log('Object date is ' + data.date.toString());
        if(!admin.has(data.noticeBy)){

            var negativeResponse = {
                'success' : false,
                'message' : 'Not authorised'
            };

            response.send(negativeResponse);
        } else {

            db.collection('notice').insert(data, function (err, resp) {
                if(err) throw err;

                var positiveResponse = {
                    'success' : true,
                    'message' : 'Notice posted'
                };

                response.send(positiveResponse);
            });

        }


    });
};


var getNotice = function (request, response) {

    mongoClient.connect(url, function (err, client) {

        var db = client.db(dbName);
        db.collection('notice').find().toArray(function (mongoError, resp) {
            if(mongoError) throw mongoError;

            response.send(resp);
        });

    });
};

var reportBug = function (request, response) {

    mongoClient.connect(url, function (err, client) {

        var db = client.db(dbName);

        var data = {
            type : request.body.type,
            date : new Date(request.body.date),
            details : request.body.details,
            reportedBy :   request.body.reportedBy
        };

        db.collection('bugs').insert(data, function (err, resp) {
            if(err) throw err;

            var positiveResponse = {
                'success' : true,
                'message' : 'Bug report posted'
            };

            response.send(positiveResponse);
        });

    });
};

var getBugReports = function(request, response) {

    mongoClient.connect(url, function (err, client) {

        var db = client.db(dbName);
        db.collection('bugs').find().toArray(function (mongoError, resp) {
            if(mongoError) throw mongoError;

            response.send(resp);
        });

    });

};

module.exports = {
    postNotice : postNotice,
    getNotice : getNotice,
    reportBug : reportBug,
    getBugReports : getBugReports
};