const express = require('express');

const mechanicActions = require('./mechanicActions');
const partsActions = require('./partsActions');


let routes = express.Router();

routes.get('/mechanic',mechanicActions.getAllMechanics);
routes.get('/parts',partsActions.getAllParts);

module.exports = routes
