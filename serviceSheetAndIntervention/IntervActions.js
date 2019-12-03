const intervQuerys = require('./IntervQueries');
const helpers = require('../helpers')

getAllInterv = async (req, res) => {
    try {
            let allInterv = await intervQuerys.getAllIntervQuery();
            res.status(200).send(allInterv);
        
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

addNewInterv = async (req, res) => {
    try {
        let newInterv = await intervQuerys.addNewIntervQuery(req.body);
        res.status(200).send('New intervention added!');
        // }
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

updateInterv = async (req, res) => {
    try {
        let Interv = await intervQuerys.updateIntervQuery(req.body,req.params.interv);
        res.status(201).send('Intervention updated!');
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

softDeleteInterv = async(req,res)=>{
    try {
        let interv = await intervQuerys.softDeleteIntervQuery(req.body.interv_ID,req.body.deleted);
        res.status(200).send(`Intervention with ID ${req.body.interv_ID} new deleted value`);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllInterv,
    addNewInterv,
    updateInterv,
    softDeleteInterv

}