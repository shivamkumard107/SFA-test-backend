//Authentication controllers

var mongoDb = require('mongodb');
var mongoClient = mongoDb.MongoClient;
var uniqid = require('uniqid');
var url = require('./../routes/globalAccess.js').baseUrl;
var dbName = require('./../routes/globalAccess.js').dbName;

var register = function(request,response){
    mongoClient.connect(url,function(err,client){
        var db = client.db(dbName);

        var query = {
            mobile : request.body.mobile
        };

        db.collection('employee').findOne(query,function(err,employee){
            if(err) throw err;
            //If employee not null - exists
            if(employee){
                response.send(false);
            }

            else{

                var unid = uniqid();

                var emp_dept = request.body.dept;
                emp_dept = emp_dept.toLowerCase();

                var data = {
                    name : request.body.name,
                    mobile : request.body.mobile,
                    email : request.body.email,
                    pass : request.body.pass,
                    dept : emp_dept,
                    token : unid
                };

                db.collection('employee').insert(data, function(err,resp){
                    if(err) throw err;

                    response.send(true);

                });
            }

        });

        // client.close();
    });
};

var login = function(request,response){
    mongoClient.connect(url,function(err,client){
        var db = client.db(dbName);

        // console.log(request.body.mobile + " "+ request.body.pass);

        var query = {
            mobile : request.body.mobile,
            pass : request.body.pass
        };

        db.collection('employee').findOne(query,function(err,resp){
            if(resp){
                resp.status = true;
                // console.log(resp);
                response.send(resp);
                console.log("True");
            }

            // resp is null
            else{

                var js = {

                    name : null,
                    mobile : null,
                    email : null,
                    pass : null,
                    dept : null,
                    status : false
                };
                console.log("False");

                // console.log(js);
                response.send(js);
            }
        });

        // client.close();
    });
};

var getEmployees = function(request,response){
    mongoClient.connect(url,function(err,client){

        var db = client.db(dbName);
        db.collection('employee').find().toArray(function(err,employees){
            if(err) throw err;
            response.send(employees);
        });

        // client.close();
    });
};




module.exports = {
    register : register,
    login : login,
    getEmployees : getEmployees
};

