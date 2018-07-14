var mongoClient = require("mongodb").MongoClient;
var isodate = require("isodate");
/* GET home page. */


var url = require('./../routes/globalAccess.js').baseUrl;
var dbName = require('./../routes/globalAccess.js').dbName;


var countEmpJt = function (request, response) {
    mongoClient.connect(url, function (err, client) {

        var db = client.db(dbName);

        // console.log(request.query.emp);
        var emp = request.query.emp;

        console.log(emp);
        console.log(getQuery(emp));
        var q = getQuery(emp);

        console.log("HI");

        db.collection("JobTicket")
            .aggregate([
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
                    $match: {
                        $and: [
                            q,
                            {
                                isDelivered: false
                            }
                        ]
                    }
                },
                {
                    $count : "count"
                }
            ])
            .toArray(function (mongoError, resp) {
                if (mongoError) throw mongoError;

                response.send(resp);

            });


    });
};

var countEmpJt = function (request, response) {
    mongoClient.connect(url, function (err, client) {

        var db = client.db(dbName);

        // console.log(request.query.emp);
        var emp = request.query.emp;

        console.log(emp);
        console.log(getQuery(emp));
        var q = getQuery(emp);

        console.log("HI");

        db.collection("JobTicket")
            .aggregate([
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
                    $match: {
                        $and: [
                            q,
                            {
                                isDelivered: false
                            },
                            {
                                // 'processes.printing.updates'
                            }
                        ]
                    }
                },
                {
                    $count : "count"
                }
            ])
            .toArray(function (mongoError, resp) {
                if (mongoError) throw mongoError;

                response.send(resp);

            });


    });
};



var getQuery = function getQuery(emp) {

    var q = null;
    if (emp == 'designing') {
        q = {
            $or: [
                {
                    "processes.book.designing.isRequired": true
                },
                {
                    "processes.box.designing.isRequired": true
                },
                {
                    "processes.cover.designing.isRequired": true
                }
            ]
        };
    } else if (emp == 'ferro') {
        q = {
            $or: [
                {
                    "processes.book.ferro.isRequired": true
                },
                {
                    "processes.box.ferro.isRequired": true
                },
                {
                    "processes.cover.ferro.isRequired": true
                }
            ]
        };
    } else if (emp == 'plates') {
        q = {
            $or: [
                {
                    "processes.book.plates.isRequired": true
                },
                {
                    "processes.box.plates.isRequired": true
                },
                {
                    "processes.cover.plates.isRequired": true
                }
            ]
        };
    } else if (emp == 'printing') {
        q = {
            $or: [
                {
                    "processes.book.printing.isRequired": true
                },
                {
                    "processes.box.printing.isRequired": true
                },
                {
                    "processes.cover.printing.isRequired": true
                }
            ]
        };
    } else if (emp === 'packing') {
        q = {
            $or: [
                {
                    "processes.book.packing.isRequired": true
                },
                {
                    "processes.box.packing.isRequired": true
                },
                {
                    "processes.cover.packing.isRequired": true
                }
            ]
        };

    } else if (emp == 'dispatch') {
        q = {
            $or: [
                {
                    "processes.book.dispatch.isRequired": true
                },
                {
                    "processes.box.dispatch.isRequired": true
                },
                {
                    "processes.cover.dispatch.isRequired": true
                }
            ]
        };

    } else if (emp == 'challan') {
        q = {
            $or: [
                {
                    "processes.book.challan.isRequired": true
                },
                {
                    "processes.box.challan.isRequired": true
                },
                {
                    "processes.cover.challan.isRequired": true
                }
            ]
        };

    } else if (emp == 'bill') {
        q = {
            $or: [
                {
                    "processes.book.bill.isRequired": true
                },
                {
                    "processes.box.bill.isRequired": true
                },
                {
                    "processes.cover.bill.isRequired": true
                }
            ]
        };

    } else if (emp == 'folding') {

        q = {
            "processes.book.folding.isRequired": true
        };

    } else if (emp == 'gathering') {
        q = {
            "processes.book.folding.isRequired": true
        };

    } else if (emp == 'perfect') {
        q = {
            "processes.book.perfect.isRequired": true
        };

    } else if (emp == 'sewing') {
        q = {
            "processes.book.sewing.isRequired": true
        };

    } else if (emp == 'centre_pin') {
        q = {
            "processes.book.centre_pin.isRequired": true
        };

    } else if (emp == 'finishing') {
        q = {
            "processes.book.finishing.isRequired": true
        };

    } else if (emp == 'lamination') {
        q = {
            $or: [
                {
                    "processes.cover.lamination.isRequired": true
                },
                {
                    "processes.box.lamination.isRequired": true
                }
            ]
        };

    } else if (emp == 'uv') {
        q = {
            "processes.box.uv.isRequired": true
        };

    } else if (emp == 'embossing') {
        q = {
            "processes.box.embossing.isRequired": true
        };

    } else if (emp == 'foiling') {
        q = {
            "processes.box.foiling.isRequired": true
        };

    } else if (emp == 'die_cut') {
        q = {
            "processes.box.die_cut.isRequired": true
        };

    } else if (emp == 'pasting') {
        q = {
            "processes.box.pasting.isRequired": true
        };

    } else if (emp == 'creasing') {
        q = {
            "processes.cover.creasing.isRequired": true
        };

    } else if (emp === 'binding') {
        q = {
            "processes.cover.binding.isRequired": true
        };

    } else {
        q = {};
    }

    return q;
};



var getAllJt = function (request, response) {

    mongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);
        var pg = request.query.page;

        var recPerPage = 5;
        if (request.query.perPage) {

            recPerPage = parseInt(request.query.perPage);
        }

        // db.collection('JobTicket').find()
        //     .skip( pg > 0 ? ( ( pg - 1 ) * recPerPage ) : 0 )
        //     .limit( recPerPage )
        //     .sort(
        //         {
        //             deliveryDate : -1
        //         }
        //     ).
        //     toArray(function(err, jobTicket){
        //     if(err) throw err;
        //
        //     // var timeInMss = Date.now();
        //     // console.log(timeInMss);
        //     response.send(jobTicket);
        // });

        db.collection('JobTicket').find(
            {
                isDelivered: false
            }
        ).sort(
            {
                deliveryDate: 1
            }
        ).toArray(function (err, jobTicket) {
            if (err) throw err;

            // var timeInMss = Date.now();
            // console.log(timeInMss);
            response.send(jobTicket);
        });


        // client.close();
    });

};


//Tested on LocalHost
// http://localhost:3000/date?startDate=1998-12-10&&endDate=1999-01-10
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

        db.collection('JobTicket').find(
            {
                deliveryDate: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        ).toArray(function (mongoError, ticket) {

            if (mongoError) throw mongoError;
            response.send(ticket);

        });


    });
};

module.exports = {
    countEmpJt : countEmpJt
};


//GET RECORDS FROM END
// db.collection.find().limit(1).sort({$natural:-1})


// function printStudents(pageNumber, nPerPage) {
//     print( "Page: " + pageNumber );
//     db.students.find()
//         .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
//         .limit( nPerPage )
//         .forEach( student => {
//         print( student.name );
// } );
// }