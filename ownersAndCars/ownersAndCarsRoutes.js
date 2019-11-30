const express = require('express');
const middleware = require('../middleware/common')
const ownerActions = require('./ownersActions');
const carActions = require('./carsActions');


let routes = express.Router();

routes.get('/owners',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],ownerActions.getAllOwners);
routes.post('/login',[middleware.checkToken,middleware.verifyToken],ownerActions.login);

routes.post('/owners/data',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOwner],ownerActions.getAllDataForOwnerID);
routes.post('/owners/new',[middleware.emailValidator],ownerActions.addNewOwner);

routes.post('/admin/owners/data',[middleware.checkRoleOperator],ownerActions.softDeleteAllDataForOwnerID,middleware.redirectFunc);


routes.get('/cars',carActions.getAllCars);
routes.post('/cars',carActions.addNewCar);


module.exports = routes
