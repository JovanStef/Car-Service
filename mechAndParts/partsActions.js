const partsQuerys = require('./partsQueries');

getAllParts =async(req,res)=>{
    try{
        let allParts = await partsQuerys.getAllPartsQuery();
        res.status(200).send(allParts);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllParts

}