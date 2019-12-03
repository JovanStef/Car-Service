const express = require('express');
const middleware = require('../middleware/common')
const ownerActions = require('./ownersActions');
const carActions = require('./carsActions');


let routes = express.Router();

routes.post('/owners',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],ownerActions.getOwnersByEmail);
routes.post('/login',ownerActions.login);

routes.get('/owners/data',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOwner],ownerActions.getAllDataForOwnerID);
routes.post('/owners/new',[middleware.emailValidator],ownerActions.addNewOwner);

routes.post('/admin/owners/data',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],ownerActions.softDeleteAllDataForOwnerID,middleware.redirectFunc);


routes.get('/cars',carActions.getAllCars);
routes.post('/cars',carActions.addNewCar);


module.exports = routes
