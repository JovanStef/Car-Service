const express = require('express');
const middleware = require('../middleware/common')

const mechanicActions = require('./mechanicActions');
const partsActions = require('./partsActions');


let routes = express.Router();

routes.get('/mechanic/all',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],mechanicActions.getOnlyAllMechanics);
routes.get('/mechanic',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],mechanicActions.getAllMechanics);
routes.post('/mechanic',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator,middleware.keyWord],mechanicActions.addNewMech);

routes.get('/parts',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],partsActions.getAllParts);
routes.post('/parts',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator,middleware.keyWord],partsActions.addNewPart);


module.exports = routes
