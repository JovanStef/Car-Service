const express = require('express');

const mechanicActions = require('./mechanicActions');
const partsActions = require('./partsActions');


let routes = express.Router();

routes.get('/mechanic',mechanicActions.getAllMechanics);
routes.post('/mechanic',mechanicActions.addNewMech);

routes.get('/parts',partsActions.getAllParts);
routes.post('/parts',partsActions.addNewPart);


module.exports = routes
