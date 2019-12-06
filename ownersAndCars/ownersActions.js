const ownersQuerys = require('./ownersQueries');
const operatorQuerys =require('../operators/operatorQueries');
const { Owner, Car, ServiceSheet, Intervention, Mechanic, Part } = require('../models');

const helpers = require('../helpers');

var jwt = require('jsonwebtoken');

getAllOwnersAndTheirCars =async(req,res)=>{
    try{
        let owner = await ownersQuerys.getAllOwnersAndTheirCarsQuery();
        let data  = helpers.ownersAndCarsDataJSON(owner)
         res.status(200).send(data);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

getOwnersByEmail =async(req,res)=>{
    try{
        let owner = await ownersQuerys.getOwnersByEmailQuery(req.body.email);
        let data = helpers.ownersDataJSON(owner);
         res.status(200).send(data);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

getAllDataForOwnerID =async(req,res)=>{
    try{
        let tokenData = jwt.verify(req.token, 'owner', (err, authorizedData) => {
            return authorizedData
        })
        let allDataOwners = await ownersQuerys.getAllDataForOwnerIDQuery(tokenData.user.password,tokenData.user.email);
        let resErr = helpers.responseError(res,allDataOwners,'Please check your credentials')
        if(resErr){
            res.status(401).send(resErr);
        }else{
            let data = helpers.ownersDataJSON(allDataOwners);
            res.status(200).send(data);
        }
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

addNewOwner =async(req,res)=>{
    try{
        let newOwner = await ownersQuerys.addNewOwnerQuery(req.body);
        res.status(200).send('New owner added!');
    }
    catch (error){
         res.status(500).send(error.message);

    }
};

softDeleteAllDataForOwnerID =async(req,res)=>{
    try{
        let ownerDataToDelete = await ownersQuerys.softDeleteOwnerDataQuery(req.body.owner_id,req.body.deleted);
        res.status(200).send(`Owner with ID ${req.body.owner_id} new deleted value`);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

login=async(req,res)=>{
    let pass = req.body.password;
    let email = req.body.email;
    try {
        let user
        let operatorCredentials = await operatorQuerys.getOperatorCredentials(pass,email);
        let ownerCredentials = await ownersQuerys.getOwnerCredentials(pass,email);
        let bool = helpers.logginRoleDesc(user,operatorCredentials,ownerCredentials,pass);
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
    getAllOwnersAndTheirCars

}