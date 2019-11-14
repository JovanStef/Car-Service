const express = require('express');

let ownersAndCarsRoutes = require('./ownersAndCars/ownersAndCarsRoutes');

let appRouter = express.Router();
appRouter.use(ownersAndCarsRoutes);

module.exports=appRouter
