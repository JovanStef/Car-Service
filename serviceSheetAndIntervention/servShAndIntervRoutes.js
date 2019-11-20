const express = require('express');

const IntervActions = require('./IntervActions');
const servShActions = require('./servSheetActions');


let routes = express.Router();

routes.get('/interv',IntervActions.getAllInterv);
routes.get('/serv-sh',servShActions.getAllServSh);

module.exports = routes
