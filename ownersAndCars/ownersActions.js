const ownersQuerys = require('./ownersQueries');
const {Owner} = require('../models');
const helpers = require('../helpers');
const middleware = require('../middleware/common')

var jwt = require('jsonwebtoken');


getAllOwners =async(req,res)=>{
    try{
        let allOwners = await ownersQuerys.getAllOwnersQuery();
        let owner = new Owner(allOwners)
        let owners = owner.toJson()
        res.status(200).send(owners);
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

loginOwner=async(req,res)=>{
    let pass = req.body.password;
    let email = req.body.email;
    const header = req.headers['authorization']
    try {
        let ownerCredentials = await ownersQuerys.getOwnerCredentials(pass,email);
        let owner = ownerCredentials[0];
        let role = Object.keys(owner)[0].split('_');
        console.log(owner.password,pass)
        console.log(header)
        if (owner.password === pass) {
            var privateKey = 'owner'
            var token = jwt.sign({owner}, privateKey,{ expiresIn: '24h' });
            let ownerToSend = {
                Name:owner.Name,
                Email:owner.email,
                Token:token,
                role:role[0]
            }
            res.status(200).send(ownerToSend);
        } else {
            res.status(401).send('YOU SHALL NOT PASS !!!!');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllOwners,
    addNewOwner,
    getAllDataForOwnerID,
    softDeleteAllDataForOwnerID,
    loginOwner

}