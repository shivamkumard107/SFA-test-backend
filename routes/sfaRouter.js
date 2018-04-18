var express = require('express');
var sfaRouter = express.Router();

var sfaJTController = require('./../controllers/sfaJTControllers');
var sfaProcessesController = require('./../controllers/sfaProcesses');
var sfaAuthenticate = require('./../controllers/sfaAuthenticate');
var sfaRegex = require('./../controllers/sfaRegexTicket');

var test = require('./../controllers/test');

//Auth
sfaRouter.route('/register').post(sfaAuthenticate.register).get(sfaAuthenticate.getEmployees);
sfaRouter.route('/login').post(sfaAuthenticate.login);

//Processes
sfaRouter.route('/processes').get(sfaProcessesController.getAllJTProcesses).
                    post(sfaProcessesController.postJTProcesses);

//EMPLOYEE JT-PROCESS JOIN
sfaRouter.route('/task').get(sfaProcessesController.getEmpJt);

//Ticket
sfaRouter.route('/ticket').post(sfaJTController.postJt).get(sfaJTController.getAllJt);
sfaRouter.route('/jobticket').get(sfaJTController.getParticularJt);



//Update progress
sfaRouter.route('/update').post(sfaProcessesController.updateProgress);


//test
sfaRouter.route('/test').get(test.getAllJt);

//Regex by Client name
//task/client?emp=printing&reg=str
sfaRouter.route('/task/client').get(sfaRegex.getTaskByClientRegex);
//task/job?emp=printing&reg=str
sfaRouter.route('/task/jobname').get(sfaRegex.getTaskByJobNameRegex);


module.exports = sfaRouter;