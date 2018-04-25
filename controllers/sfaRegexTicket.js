    var mongoDb = require('mongodb');
    var mongoClient = mongoDb.MongoClient;

    var url = require('./../routes/globalAccess.js').baseUrl;
    var dbName = require('./../routes/globalAccess.js').dbName;

    var getQueryFn = require('./sfaProcesses.js');


    // var errorHandler

    var getTaskByClientRegex = function(request, response){
        mongoClient.connect(url, function(err, client){

            var db = client.db(dbName);

            // console.log(request.query.emp);
            var emp = request.query.emp;
            var regexRequest = request.query.reg;
            var regExpression = new RegExp(regexRequest);

            console.log(getQueryFn.getQuery(emp));
            var q = getQueryFn.getQuery(emp);

            db.collection("JobTicket").aggregate([
                {
                    $unwind: "$wt"
                },
                {
                    $lookup:
                        {
                            from: "JobTicketProcesses",
                            localField: "wt",
                            foreignField: "wt_id",
                            as: "processes"
                        }
                }
                ,
                {
                    $match : {
                        $and :[
                            {
                                //Redundant or just to make it work
                             $or : [
                                 q
                             ]
                            },
                            {
                                'Client.name' : {
                                    $regex : regExpression,
                                    $options: 'i'
                                }
                            }
                        ]
                    }
                }

            ]).toArray(function (mongoError, resp) {
                if(mongoError) throw mongoError;


                // console.log(resp);
                response.send(resp);

            });


        });
    };

    var getTaskByJobNameRegex = function(request, response){
        mongoClient.connect(url, function(err, client){

            var db = client.db(dbName);

            // console.log(request.query.emp);
            var emp = request.query.emp;
            var regexRequest = request.query.reg;
            var regExpression = new RegExp(regexRequest);

            console.log(getQueryFn.getQuery(emp));
            var q = getQueryFn.getQuery(emp);

            db.collection("JobTicket").aggregate([
                {
                    $unwind: "$wt"
                },
                {
                    $lookup:
                        {
                            from: "JobTicketProcesses",
                            localField: "wt",
                            foreignField: "wt_id",
                            as: "processes"
                        }
                }
                ,
                {
                    $match : {
                        $and :[
                            {
                                //Redundant or just to make it work
                                $or : [
                                    q
                                ]
                            },
                            {
                                'Job.name' : {
                                    $regex : regExpression,
                                    $options: 'i'
                                }
                            }
                        ]
                    }
                }

            ]).toArray(function (mongoError, resp) {
                if(mongoError) throw mongoError;


                // console.log(resp);
                response.send(resp);

            });


        });
    };


    module.exports = {
        getTaskByClientRegex : getTaskByClientRegex,
        getTaskByJobNameRegex : getTaskByJobNameRegex
    };

    // .find(
    //     {
    //         'Client.name' : {
    //             $regex : reg
    //         }
    //     }
    // )

    // {$match:
    //     { $or: [
    //         { 'title':
    //             { $regex:  request.query.val, $options: 'i'} },
    //         { 'skills_required': { $regex:  request.query.val, $options: 'i'} }] }},