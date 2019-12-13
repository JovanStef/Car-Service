const servShQuerys = require('./servSheetQueries');
const {allData,responseError} = require('../helpers');

getAllServSh = async (req, res) => {
    try {
        let allServSh = await servShQuerys.getAllServShQuery();
        let data = new allData(allServSh);
        data = data.serviceS();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

getServShbySnum = async (req, res) => {
    try {
        let ServSh = await servShQuerys.getServShDatabySerialQuery(req.params.sSnum);
        let resErr = responseError(ServSh, `Service sheet with serial number ${req.params.sSnum} does not exist`)
        if (resErr) {
            res.status(401).send(resErr);
        }
         else {
             let data = new allData(ServSh);
             data = data.serviceS();
             res.status(200).send(data);
        }

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
        let resErr = responseError(ServSh, `Service sheet with ID ${req.body.id} does not exist`)
        if (resErr) {
            res.status(401).send(resErr);
        }
         else {
            
             res.status(200).send(`Service sheet with ID ${req.body.id} updated!`);
        }

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