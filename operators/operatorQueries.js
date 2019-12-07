const connectDB = require('../database');

getOperatorCredentials = (email)=>{
    const query ='SELECT * FROM operator WHERE email=?;'
    return new Promise((resolve,reject)=>{
        connectDB.query(query,[email],(error,results,fields)=>{
            if(error){
                reject(error);
            }else{
                resolve(results);
            };
        });
    });
};

module.exports = {
    getOperatorCredentials
}