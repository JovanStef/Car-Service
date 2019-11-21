const connectDB = require('../database');

getAllServShQuery = ()=>{
    const query = 'SELECT *FROM service_sheet';
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

addNewServShQuery = (request) => {
    const query = "INSERT INTO service_sheet (Service_S_Num, Date_Time, Cost, Service_toCar_ID)VALUES (FLOOR(RAND()*(20000-10000+1))+10000, NOW(),?,?);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Cost, request.Service_toCar_ID], (error, results, fields) => {
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
    getAllServShQuery,
    addNewServShQuery
}