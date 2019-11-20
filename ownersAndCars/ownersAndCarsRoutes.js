const express = require('express');

const ownerActions = require('./ownersActions');
const carActions = require('./carsActions');


let routes = express.Router();

routes.get('/owners',ownerActions.getAllOwners);
routes.get('/cars',carActions.getAllCars);

module.exports = 
    routes
