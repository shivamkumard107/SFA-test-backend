var mongoDb = require('mongodb');
var mongoClient = mongoDb.MongoClient;
var uniqid = require('uniqid');
var url = require('./../routes/globalAccess.js').baseUrl;
var dbName = require('./../routes/globalAccess.js').dbName;
var isodate = require("isodate");

var moment = require('moment');

//TODO : Page number
var getAllJt = function (request, response) {
    mongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        db.collection('JobTicket').find().toArray(function (err, jobTicket) {
            if (err) throw err;

            // var timeInMss = Date.now();
            // console.log(timeInMss);
            // console.log(jobTicket);
            response.send(jobTicket);
        });

        // client.close();
    });

};

// http://localhost:3000/empticket?empId=A

//Post request
//Send in body
// {
//     "empId" : "designing"
// }


var postJt = function (request, response) {
    mongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        // var d = new Date();
        // var isoString = d.toISOString();
        // console.log(isoString);

        // var momentDate = moment(delDate, 'YYYY-MM-DDTHH:mm:ss+-HH:mm:ss');
        // var jsDate = momentDate.toDate();

        // var currDate = request.body.date;
        // currDate = moment(currDate).format();
        // currDate = currDate.toDate();


        // var delDate = request.body.deliveryDate;
        // delDate = moment(delDate).format();
        // moment(delDate, 'yyyy-MM-dd').toISOString();
        // delDate = delDate.toDate();

        var currDate = new Date(request.body.date);
        var delDate = new Date(request.body.deliveryDate);


        var jt =
            {
                Client: {
                    contact: request.body.Client.contact,
                    name: request.body.Client.name
                },

                date: new Date(request.body.date),
                deliveryDate: new Date(request.body.deliveryDate),
                notes: request.body.notes,
                wt: request.body.wt,
                priority: request.body.priority,
                image: request.body.image,
                isDelivered: request.body.isDelivered,

                Job: {
                    name: request.body.Job.name,
                    noOfCol: request.body.Job.noOfCol,
                    printRun: request.body.Job.printRun,
                    size: request.body.Job.size,
                    type: request.body.Job.type,
                    wastage: request.body.Job.wastage
                },

                Machine: {
                    machine: request.body.Machine.machine,
                    name: request.body.Machine.name
                },


                Paper: {
                    details: request.body.Paper.details,
                    location: request.body.Paper.location,
                    paperBy: request.body.Paper.paperBy,
                    quality: request.body.Paper.quality,
                    quantity: request.body.Paper.quantity
                },

                Plate: {
                    name: request.body.Plate.name,
                    plate: request.body.Plate.plate,
                    quantity: request.body.Plate.quantity
                }
            };


        db.collection('JobTicket').insert(jt, function (err, resp) {
            if (err) throw err;

            var idArr = resp['ops'];
            var wt_id = idArr[0].wt;
            console.log(wt_id);

            //Send success status and inserted wt id
            var json_response = {
                'success': true,
                'wt_id': wt_id
            };

            response.send(json_response);


        });

        // client.close();
    });
};

var getParticularJt = function (request, response) {
    mongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);


        var query = {
            wt: request.query.wt
        };

        db.collection('JobTicket').findOne(query, function (err, ticket) {
            if (err) throw err;
            response.send(ticket);
        });

        // client.close();
    });

};


module.exports = {
    getAllJt: getAllJt,
    postJt: postJt,
    getParticularJt: getParticularJt
};