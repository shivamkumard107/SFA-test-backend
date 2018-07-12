    var mongoDb = require('mongodb');
    var mongoClient = mongoDb.MongoClient;

    var url = require('./../routes/globalAccess.js').baseUrl;
    var dbName = require('./../routes/globalAccess.js').dbName;

    var getQueryFn = require('./sfaProcesses.js');


    // var errorHandler

    //TODO: Pg
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

    //TODO: Pg
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


    //TODO: Pg
    var getJtByDate = function (request, response) {

        mongoClient.connect(url, function (err, client) {

            var db = client.db(dbName);
            var startDate = request.query.startDate;
            var endDate = request.query.endDate;

            // startDate = new Date(startDate.toISOString());

            startDate = new Date(startDate);
            endDate = new Date(endDate);

            console.log(startDate);
            console.log(endDate);


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
                    $match :  {
                        deliveryDate : {
                            $gte : startDate,
                            $lt : endDate
                        }
                    }
                }

            ]).toArray(function (mongoError, resp) {
                if(mongoError) throw mongoError;


                // console.log(resp);
                response.send(resp);

            });


        });
    };

//Get ticket by client which are delivered
    var searchDeliveredTicketsByClientOrJob = function(request, response){
        mongoClient.connect(url, function(err, client){

            var db = client.db(dbName);

            // console.log(request.query.emp);
            // var emp = request.query.emp;
            var regexRequest = request.query.reg;
            var regExpression = new RegExp(regexRequest);


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
                                isDelivered : true
                            },
                            {
                                $or : [
                                    {
                                        'Client.name' : {
                                            $regex : regExpression,
                                            $options: 'i'
                                        }
                                    },
                                    {
                                        'Job.name' : {
                                            $regex : regExpression,
                                            $options: 'i'
                                        }

                                    }
                                ]
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
        getTaskByJobNameRegex : getTaskByJobNameRegex,
        getJtByDate : getJtByDate,
        searchDeliveredTicketsByClientOrJob : searchDeliveredTicketsByClientOrJob
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