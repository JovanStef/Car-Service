const express = require('express');

const ownerActions = require('./ownersActions');
const carActions = require('./carsActions');


let routes = express.Router();

routes.get('/owners',ownerActions.getAllOwners);
routes.post('/owners',ownerActions.addNewOwner);

routes.get('/cars',carActions.getAllCars);
routes.post('/cars',carActions.addNewCar);


module.exports = routes
