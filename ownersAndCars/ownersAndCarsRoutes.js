const express = require('express');
const middleware = require('../middleware/common')
const ownerActions = require('./ownersActions');
const carActions = require('./carsActions');


let routes = express.Router();

routes.get('/owners/all',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],ownerActions.getAllOwners);
routes.get('/owners',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],ownerActions.getAllOwnersAndTheirCars);
routes.post('/owners/email',[middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],ownerActions.getOwnersByEmail);
routes.post('/login',ownerActions.login);

routes.get('/owners/data',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOwner],ownerActions.getAllDataForOwnerID);
routes.post('/owners/personal',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOwner],ownerActions.updatePersonalInfoOwner);
routes.post('/owners/new',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator,middleware.emailValidator],ownerActions.addNewOwner);

routes.post('/admin/owners/data',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],ownerActions.softDeleteAllDataForOwnerID,middleware.redirectFunc);

routes.get('/cars/all',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],carActions.getOnlyAllCars);
routes.get('/cars',[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator],carActions.getAllCars);
routes.post('/cars',[[middleware.logger,middleware.checkToken,middleware.verifyToken,middleware.checkRoleOperator]],carActions.addNewCar);


module.exports = routes
