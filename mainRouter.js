const express = require('express');

let ownersAndCarsRoutes = require('./ownersAndCars/ownersAndCarsRoutes');
let servShAndIntervRoutes = require('./serviceSheetAndIntervention/servShAndIntervRoutes');
let mechAndPartsRoutes = require('./mechAndParts/mechAndPartsRoutes');


let appRouter = express.Router();
appRouter.use(ownersAndCarsRoutes);
appRouter.use(servShAndIntervRoutes);
appRouter.use(mechAndPartsRoutes);


module.exports = appRouter
