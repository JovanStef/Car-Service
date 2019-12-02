const ownersQuerys = require('./ownersQueries');
const operatorQuerys =require('../operators/operatorQueries');
const { Owner, Car, ServiceSheet, Intervention, Mechanic, Part } = require('../models');

const helpers = require('../helpers');
const middleware = require('../middleware/common')

var jwt = require('jsonwebtoken');


getAllOwners =async(req,res)=>{
    try{
        let allOwners = await ownersQuerys.getAllOwnersQuery();
let ownersTosend=[]
        allOwners.map(owner=>{
        temp = {
            Owner:new Owner(owner),
            Car:new Car(owner),
            Service_Sheet:new ServiceSheet(owner),
            Intervention:new Intervention(owner),
            Mechanic:new Mechanic(owner),
            Parts:new Part(owner)

        }
        ownersTosend.push(temp)
        })
        res.status(200).send(ownersTosend);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

getAllDataForOwnerID =async(req,res)=>{
    try{
        let allDataOwners = await ownersQuerys.getAllDataForOwnerIDQuery(req.body.password,req.body.email);
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
        let ownerDataToDelete = await ownersQuerys.softDeleteOwnerDataQuery(req.body.owner_id);
        res.status(200).send(`Owner with ID ${req.body.owner_id} deleted`);
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
        console.log('operatorCredentials')
        let bool = helpers.logginRoleDesc(user,operatorCredentials,ownerCredentials,pass);
        res.send(bool)
    
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllOwners,
    addNewOwner,
    getAllDataForOwnerID,
    softDeleteAllDataForOwnerID,
    login

}