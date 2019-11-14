const express = require('express');

const actions = require('./ownersActions');

let routes = express.Router();

routes.get('/owners',actions.getAllOwners);

module.exports = 
    routes
