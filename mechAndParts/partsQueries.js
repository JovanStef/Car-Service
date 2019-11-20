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

module.exports={
    getAllPartsQuery
}