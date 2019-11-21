const ownersQuerys = require('./ownersQueries');

getAllOwners =async(req,res)=>{
    try{
        let allOwners = await ownersQuerys.getAllOwnersQuery();
        console.log(allOwners)
        res.status(200).send(allOwners);
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
    addNewOwner

}