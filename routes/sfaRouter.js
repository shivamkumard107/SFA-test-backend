var express = require('express');
var sfaRouter = express.Router();

var sfaJTController = require('./../controllers/sfaJTControllers');
var sfaProcessesController = require('./../controllers/sfaProcesses');
var sfaAuthenticate = require('./../controllers/sfaAuthenticate');
var sfaRegex = require('./../controllers/sfaRegexTicket');
var misc = require('./../controllers/misc');

var test = require('./../controllers/test');

//Auth
sfaRouter.route('/register').post(sfaAuthenticate.register).get(sfaAuthenticate.getEmployees);
sfaRouter.route('/login').post(sfaAuthenticate.login);
sfaRouter.route('/login/update').post(sfaAuthenticate.updatePassword);

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
// sfaRouter.route('/date').get(test.getJtByDate);


//Regex by Client name
//task/client?emp=printing&reg=str
sfaRouter.route('/task/client').get(sfaRegex.getTaskByClientRegex);
//task/job?emp=printing&reg=str
sfaRouter.route('/task/jobname').get(sfaRegex.getTaskByJobNameRegex);

// http://localhost:3000/date?startDate=1999-11-10&&endDate=2002-11-10
sfaRouter.route('/task/date').get(sfaRegex.getJtByDate);


//Admin apis
sfaRouter.route('/notice').post(misc.postNotice).get(misc.getNotice);
sfaRouter.route('/report').post(misc.reportBug).get(misc.getBugReports);

module.exports = sfaRouter;