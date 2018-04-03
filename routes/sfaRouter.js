var express = require('express');
var sfaRouter = express.Router();

var sfaJTController = require('./../controllers/sfaJTControllers');
var sfaProcessesController = require('./../controllers/sfaProcesses');
var sfaAuthenticate = require('./../controllers/sfaAuthenticate');

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

sfaRouter.route('/update').post(sfaProcessesController.updateProgress);

//Update progress
sfaRouter.route('/test').get(test.getAllJt);

module.exports = sfaRouter;