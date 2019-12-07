const ownersQuerys = require('./ownersQueries');
const operatorQuerys = require('../operators/operatorQueries');
const { Owner, Car, ServiceSheet, Intervention, Mechanic, Part } = require('../models');
const bcrypt = require('bcryptjs')
const helpers = require('../helpers');
var jwt = require('jsonwebtoken');

getAllOwnersAndTheirCars = async (req, res) => {
    try {
        let owner = await ownersQuerys.getAllOwnersAndTheirCarsQuery();
        let data = helpers.ownersAndCarsDataJSON(owner)
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

getOwnersByEmail = async (req, res) => {
    try {
        let owner = await ownersQuerys.getOwnersByEmailQuery(req.body.email);
        let data = helpers.ownersDataJSON(owner);
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

getAllDataForOwnerID = async (req, res) => {
    let tokenData = jwt.verify(req.token, 'owner', (err, authorizedData) => {
        return authorizedData
    })
    try {
        let allDataOwners = await ownersQuerys.getAllDataForOwnerIDQuery(tokenData.user.email);
        let resErr = helpers.responseError(res, allDataOwners, 'Please check your credentials')
        if (resErr) {
            res.status(401).send(resErr);
        } else {
            let data = helpers.ownersDataJSON(allDataOwners);
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};
updatePersonalInfoOwner = async (req, res) => {
    let owner = req.body
    let tokenData = jwt.verify(req.token, 'owner', (err, authorizedData) => {
        return authorizedData
    })
    let checkPass = bcrypt.compareSync(owner.old_password, tokenData.user.password)
    owner.new_password = bcrypt.hashSync(owner.new_password, 5);
    if (!checkPass) {
        res.status(401).send('Please check your old password');
    } else {
        try {
            let dataOwner = await ownersQuerys.updatePersonalInfoOwnerQuery(owner, tokenData.user);
            let resErr = helpers.responseError(res, dataOwner, 'Please check your credentials')
            if (resErr) {
                res.status(401).send(resErr);
            } else {
                res.status(200).send(dataOwner);
            }
        }
        catch (error) {
            res.status(500).send(error.message);

        }
    }
};

addNewOwner = async (req, res) => {
    let newOwner = req.body;
    newOwner.password = bcrypt.hashSync(newOwner.password, 5)
    try {
        let newOwner = await ownersQuerys.addNewOwnerQuery(newOwner);
        res.status(200).send('New owner added!');
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

softDeleteAllDataForOwnerID = async (req, res) => {
    try {
        let ownerDataToDelete = await ownersQuerys.softDeleteOwnerDataQuery(req.body.owner_id, req.body.deleted);
        res.status(200).send(`Owner with ID ${req.body.owner_id} new deleted value`);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

login = async (req, res) => {
    let pass = req.body.password;
    let email = req.body.email;
    try {
        let user
        let operatorCredentials = await operatorQuerys.getOperatorCredentials(email);
        let ownerCredentials = await ownersQuerys.getOwnerCredentials(email);
        let bool = helpers.logginRoleDesc(user, operatorCredentials, ownerCredentials, pass);
        res.send(bool)

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getOwnersByEmail,
    addNewOwner,
    getAllDataForOwnerID,
    softDeleteAllDataForOwnerID,
    login,
    getAllOwnersAndTheirCars,
    updatePersonalInfoOwner

}