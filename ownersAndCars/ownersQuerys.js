const connectDB = require('../database');

getAllOwnersQuery = ()=>{
    const query = 'SELECT *FROM owner';
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
    getAllOwnersQuery
}