const mechQuerys = require('./mechanicQueries');
const {allData} = require('../helpers');

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
    getAllMechanics,
    addNewMech

}