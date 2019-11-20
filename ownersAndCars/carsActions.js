const carsQuerys = require('./carsQueries');

getAllCars =async(req,res)=>{
    try{
        let allCars = await carsQuerys.getAllCarsQuery();
        console.log(allCars)
        res.status(200).send(allCars);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllCars

}