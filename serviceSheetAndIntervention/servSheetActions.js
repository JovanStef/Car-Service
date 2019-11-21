const servShQuerys = require('./servSheetQueries');

getAllServSh = async (req, res) => {
    try {
        let allServSh = await servShQuerys.getAllServShQuery();
        res.status(200).send(allServSh);
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
    updateServSh

}