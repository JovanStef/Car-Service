const ownersQuerys = require('./ownersQueries');
const {Owner} = require('../models');
const helpers = require('../helpers');

getAllOwners =async(req,res)=>{
    try{
        let allOwners = await ownersQuerys.getAllOwnersQuery();
        let owners = new Owner(allOwners);
        let listOwners = owners.toJson();
        console.log(allOwners)
        res.status(200).send(listOwners);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

getAllDataForOwners =async(req,res)=>{
    try{
        let allDataOwners = await ownersQuerys.getAllDataForOwnersQuery();
        let data = helpers.ownersDataJSON(allDataOwners)
         res.status(200).send(data);
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

module.exports = {
    getAllOwners,
    addNewOwner,
    getAllDataForOwners

}