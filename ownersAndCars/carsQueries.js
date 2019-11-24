const connectDB = require('../database');

getAllCarsQuery = ()=>{
    const query = 'SELECT * FROM car';
    return new Promise ((resolve,reject)=>{
        connectDB.query(query,(error,results,fields)=>{
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

addNewCarQuery = (request) => {
    const query = "INSERT INTO car (Make,Model,Year,Car_toOwner_ID)VALUES (?,?,?,?);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Make, request.Model, request.Year, request.Car_toOwner_ID], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {

                resolve(results);
            }
        });
    });
};

module.exports={
    getAllCarsQuery,
    addNewCarQuery
}