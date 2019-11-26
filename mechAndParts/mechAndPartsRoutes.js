const express = require('express');
const middleware = require('../middleware/common')


const mechanicActions = require('./mechanicActions');
const partsActions = require('./partsActions');


let routes = express.Router();

routes.get('/mechanic',mechanicActions.getAllMechanics);
routes.post('/mechanic',[middleware.keyWord],mechanicActions.addNewMech);

routes.get('/parts',partsActions.getAllParts);
routes.post('/parts',[middleware.keyWord],partsActions.addNewPart);


module.exports = routes
