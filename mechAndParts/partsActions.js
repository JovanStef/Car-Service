const partsQuerys = require('./partsQueries');
const {allData,responseError} = require('../helpers');


getAllParts =async(req,res)=>{
    try{
        let allParts = await partsQuerys.getAllPartsQuery();
        let data = new allData(allParts);
        data = data.part();
        res.status(200).send(data);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

addNewPart =async(req,res)=>{
    try{
        let newPart = await partsQuerys.addNewPartQuery(req.body);
        res.status(200).send('New part added!');
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllParts,
    addNewPart

}