const express = require('express');

const IntervActions = require('./IntervActions');
const servShActions = require('./servSheetActions');


let routes = express.Router();

routes.get('/interv',IntervActions.getAllInterv);
routes.post('/interv',IntervActions.addNewInterv);
routes.patch('/interv/:interv',IntervActions.updateInterv);

routes.get('/serv-sh',servShActions.getAllServSh);
routes.post('/serv-sh',servShActions.addNewServSh);
routes.patch('/serv-sh/:cost',servShActions.updateServSh);

module.exports = routes
