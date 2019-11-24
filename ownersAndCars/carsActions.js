const carsQuerys = require('./carsQueries');
const {Owner,Car} = require('../models')

getAllCars =async(req,res)=>{
    try{
        let allCars = await carsQuerys.getAllCarsQuery();
        res.status(200).send(allCars);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

addNewCar =async(req,res)=>{
    try{
        let newCar = await carsQuerys.addNewCarQuery(req.body);
        res.status(200).send('New car added!');
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllCars,
    addNewCar

}