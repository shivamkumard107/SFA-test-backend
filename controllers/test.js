    var mongoClient = require("mongodb").MongoClient;
    var isodate = require("isodate");
    /* GET home page. */


    var url = require('./../routes/globalAccess.js').baseUrl;
    var dbName = require('./../routes/globalAccess.js').dbName;


        var getAllJt = function(request, response){

            mongoClient.connect(url, function(err, client){
                var db = client.db(dbName);
                var pg = request.query.page;
                var nPerPage = 5;

                db.collection('JobTicket').find()
                    .skip( pg > 0 ? ( ( pg - 1 ) * nPerPage ) : 0 )
                    .limit( nPerPage )
                    .toArray(function(err, jobTicket){
                    if(err) throw err;

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
                        deliveryDate : {
                            $gte : startDate,
                            $lt : endDate
                        }
                    }
                ).toArray(function (mongoError, ticket) {

                    if(mongoError) throw mongoError;
                    response.send(ticket);

                });


            });
        };

    module.exports = {
        getAllJt : getAllJt,
        getJtByDate : getJtByDate
    };


    // function printStudents(pageNumber, nPerPage) {
    //     print( "Page: " + pageNumber );
    //     db.students.find()
    //         .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
    //         .limit( nPerPage )
    //         .forEach( student => {
    //         print( student.name );
    // } );
    // }