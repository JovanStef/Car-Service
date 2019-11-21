const connectDB = require('../database');

getAllIntervQuery = ()=>{
    const query = 'SELECT *FROM intervention';
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

addNewIntervQuery = (request) => {
    const query = "INSERT INTO intervention (Inter_Type,Inter_Hours,Inter_toServiceS_ID)VALUES (?,?,?);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Inter_Type, request.Inter_Hours, request.Inter_toServiceS_ID], (error, results, fields) => {
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
    getAllIntervQuery,
    addNewIntervQuery
}