const servShQuerys = require('./servSheetQueries');

getAllServSh =async(req,res)=>{
    try{
        let allServSh = await servShQuerys.getAllServShQuery();
        res.status(200).send(allServSh);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllServSh

}