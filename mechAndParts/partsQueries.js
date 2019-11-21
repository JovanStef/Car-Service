const connectDB = require('../database');

getAllPartsQuery = ()=>{
    const query = 'SELECT *FROM parts';
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

addNewPartQuery = (request) => {
    const query = "INSERT INTO parts(Part_SerialNo,Part_Type,Part_toInter_ID,Part_toCar_ID)VALUES (FLOOR(RAND()*(800-100+1))+100,?,?,?);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Part_Type,request.Part_toInter_ID, request.Part_toCar_ID], (error, results, fields) => {
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
    getAllPartsQuery,
    addNewPartQuery
}