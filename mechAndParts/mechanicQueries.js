const connectDB = require('../database');

getAllMechanicsQuery = ()=>{
    const query = 'SELECT *FROM mechanic';
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
    getAllMechanicsQuery
}