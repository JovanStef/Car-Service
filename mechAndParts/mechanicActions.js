const mechQuerys = require('./mechanicQueries');
const {allData,responseError} = require('../helpers');

getOnlyAllMechanics =async(req,res)=>{
    try{
        let allMech = await mechQuerys.getOnlyAllMechanicsQuery();
        let data = new allData(allMech);
        data = data.mechanic();
        res.status(200).send(data);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

getAllMechanics =async(req,res)=>{
    try{
        let allMech = await mechQuerys.getAllMechanicsQuery();
        let data = new allData(allMech);
        data = data.mechanic();
        res.status(200).send(data);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

addNewMech =async(req,res)=>{
    try{
        let newMech = await mechQuerys.addNewMechQuery(req.body);
        res.status(200).send('New mechanic added!');
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getOnlyAllMechanics,
    getAllMechanics,
    addNewMech

}