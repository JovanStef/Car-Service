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

module.exports={
    getAllServShQuery
}