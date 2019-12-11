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
    let del = (req.body.deleted ==1)? "Deleted." : "Restored."
    try {
        if(req.body.deleted > 1){
            res.status(401).send(`Value for "deleted" must be 0 or 1.`);
        } 
        let interv = await intervQuerys.softDeleteIntervQuery(req.body.interv_ID,req.body.deleted);
        let resErr = helpers.responseError(interv, `Intervention with ID ${req.body.interv_ID} does not exist`)
        if (resErr) {
            res.status(401).send(resErr);
        }
         else {
            res.status(200).send(`Intervention with ID ${req.body.interv_ID} => ${del}`);
        }

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