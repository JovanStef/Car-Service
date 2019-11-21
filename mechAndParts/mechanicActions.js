const mechQuerys = require('./mechanicQueries');

getAllMechanics =async(req,res)=>{
    try{
        let allMech = await mechQuerys.getAllMechanicsQuery();
        res.status(200).send(allMech);
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