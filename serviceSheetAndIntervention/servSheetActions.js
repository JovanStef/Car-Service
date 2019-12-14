const servShQuerys = require('./servSheetQueries');
const {allData,responseError} = require('../helpers');
getOnlyAllServSh = async (req, res) => {
    try {
        let allServSh = await servShQuerys.getOnlyAllServShQuery();
        let data = new allData(allServSh);
        data = data.serviceS();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};
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

confirmServSh = async (req, res) => {
    let confirmed = (req.body.confirmed ==1)? "Confirmed." : "To be confirmed."
    try {
        if(req.body.confirmed > 1){
            res.status(401).send(`Value for "confirmed" must be 0 or 1.`);
        } 
        let ServSh = await servShQuerys.confirmServShQuery(req.params.serial,req.body);
        let resErr = responseError(ServSh, `Service sheet with serial number ${req.params.serial} does not exist`)
        if (resErr) {
            res.status(401).send(resErr);
        }
         else {
             res.status(200).send(`Service sheet with serial number ${req.params.serial} set to "${confirmed}"`);
        }
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

paidServSh = async (req, res) => {
    let paid = (req.body.paid ==1)? "Paid." : "To be paid."
    try {
        if(req.body.confirmed > 1){
            res.status(401).send(`Value for "paid" must be 0 or 1.`);
        } 
        let ServSh = await servShQuerys.paidServShQuery(req.params.serial,req.body);
        let resErr = responseError(ServSh, `Service sheet with serial number ${req.params.serial} does not exist`)
        if (resErr) {
            res.status(401).send(resErr);
        }
         else {
             res.status(200).send(`Service sheet with serial number ${req.params.serial} set to "${paid}"`);
        }
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

module.exports = {
    getOnlyAllServSh,
    getAllServSh,
    addNewServSh,
    confirmServSh,
    paidServSh,
    getServShbySnum
}