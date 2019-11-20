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

module.exports={
    getAllIntervQuery
}