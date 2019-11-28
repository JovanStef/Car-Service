const ownersQuerys = require('./ownersQueries');
const {Owner} = require('../models');
const helpers = require('../helpers');

getAllOwners =async(req,res)=>{
    try{
        let allOwners = await ownersQuerys.getAllOwnersQuery();
        let owner = new Owner(allOwners)
        let owners = owner.toJson()
        console.log(owners)
        res.status(200).send(owners);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

getAllDataForOwnerID =async(req,res)=>{
    try{
        let allDataOwners = await ownersQuerys.getAllDataForOwnerIDQuery(req.body.password);
        if(allDataOwners.length == 0){
            res.redirect('/cars')
            // res.status(401).send('Please provide a valid password');
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

module.exports = {
    getAllOwners,
    addNewOwner,
    getAllDataForOwnerID,
    softDeleteAllDataForOwnerID

}