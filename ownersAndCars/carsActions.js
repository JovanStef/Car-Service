const carsQuerys = require('./carsQueries');
const {allData,responseError,logginRoleDesc} = require('../helpers');
getOnlyAllCars =async(req,res)=>{
    try{
        let allCars = await carsQuerys.getOnlyAllCarsQuery();
        let data = new allData(allCars);
        data = data.car();
        res.status(200).send(data);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

getAllCars =async(req,res)=>{
    try{
        let allCars = await carsQuerys.getAllCarsQuery();
        let data = new allData(allCars);
        data = data.car();
        res.status(200).send(data);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

addNewCar =async(req,res)=>{
    try{
        let newCar = await carsQuerys.addNewCarQuery(req.body);
        res.status(200).send({message:'New car added!'});
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getOnlyAllCars,
    getAllCars,
    addNewCar

}