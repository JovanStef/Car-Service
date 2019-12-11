const servShQuerys = require('./servSheetQueries');
const {allData} = require('../helpers');

getAllServSh = async (req, res) => {
    try {
        let allServSh = await servShQuerys.getAllServShQuery();
        res.status(200).send(allServSh);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

getServShbySnum = async (req, res) => {
    try {
        let ServSh = await servShQuerys.getServShDatabySerialQuery(req.params.sSnum);
        let data = new allData(ServSh);
        data = data.serviceS();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

addNewServSh = async (req, res) => {
    try {
        let newServSh = await servShQuerys.addNewServShQuery(req.body);
        res.status(200).send('New service sheet added!');
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

updateServSh = async (req, res) => {
    try {
        let ServSh = await servShQuerys.updateServShQuery(req.params.cost,req.body);
        res.status(200).send('Service sheet updated!');
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllServSh,
    addNewServSh,
    updateServSh,
    getServShbySnum

}