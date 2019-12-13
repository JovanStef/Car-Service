const express = require('express');
const middleware = require('../middleware/common')


const IntervActions = require('./IntervActions');
const servShActions = require('./servSheetActions');


let routes = express.Router();

routes.get('/interv',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],IntervActions.getAllInterv);
routes.post('/interv',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator,middleware.keyWord],IntervActions.addNewInterv);
routes.post('/interv/owner',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOwner],IntervActions.softDeleteInterv);

routes.patch('/interv/:intervID',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],IntervActions.updateInterv);

routes.get('/serv-sh',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],servShActions.getAllServSh);
routes.get('/serv-sh/:sSnum',[middleware.logger,middleware.checkToken,middleware.verifyToken],servShActions.getServShbySnum);
routes.post('/serv-sh',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],servShActions.addNewServSh);
routes.patch('/serv-sh/confirmed/:serial',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOwner],servShActions.confirmServSh);
routes.patch('/serv-sh/paid/:serial',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],servShActions.paidServSh);
module.exports = routes
