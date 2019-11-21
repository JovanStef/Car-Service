const intervQuerys = require('./IntervQueries');

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
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllInterv,
    addNewInterv

}