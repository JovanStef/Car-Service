const express = require('express');
const middleware = require('../middleware/common')
const ownerActions = require('./ownersActions');
const carActions = require('./carsActions');


let routes = express.Router();

routes.get('/owners',ownerActions.getAllOwners);
routes.post('/owners/data',[middleware.logger],ownerActions.getAllDataForOwnerID,middleware.redirectFunc);
routes.post('/owners/new',[middleware.emailValidator],ownerActions.addNewOwner);

routes.get('/cars',carActions.getAllCars);
routes.post('/cars',carActions.addNewCar);


module.exports = routes
