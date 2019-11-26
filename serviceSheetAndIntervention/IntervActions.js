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
        // if(!helpers.keyWordValidator(req.body.Inter_Type)){
        //     res.status(401).send(`Please set proper Inter_Type - invalid ${req.body.Inter_Type}`);

        // }else{
            // helpers.keyWordValidator(req.body);
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

module.exports = {
    getAllInterv,
    addNewInterv,
    updateInterv

}