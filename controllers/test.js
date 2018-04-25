    var mongoClient = require("mongodb").MongoClient;
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

    module.exports = {
        getAllJt : getAllJt
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