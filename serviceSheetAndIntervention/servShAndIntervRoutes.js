const express = require('express');
const middleware = require('../middleware/common')


const IntervActions = require('./IntervActions');
const servShActions = require('./servSheetActions');


let routes = express.Router();

routes.get('/interv',IntervActions.getAllInterv);
routes.post('/interv',[middleware.keyWord],IntervActions.addNewInterv);
routes.post('/interv/owner',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOwner],IntervActions.softDeleteInterv);

routes.patch('/interv/:interv',IntervActions.updateInterv);

routes.get('/serv-sh',servShActions.getAllServSh);
routes.get('/serv-sh/:sSnum',[middleware.logger,middleware.checkToken,middleware.verifyToken],servShActions.getServShbySnum);
routes.post('/serv-sh',servShActions.addNewServSh);
routes.patch('/serv-sh/:cost',servShActions.updateServSh);

module.exports = routes
