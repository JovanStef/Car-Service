const ownersQuerys = require('./ownersQuerys');

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

module.exports = {
    getAllOwners

}