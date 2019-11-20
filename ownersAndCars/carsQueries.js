const connectDB = require('../database');

getAllCarsQuery = ()=>{
    const query = 'SELECT *FROM car';
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

module.exports={
    getAllCarsQuery
}