const connectDB = require('../database');

getOperatorCredentials = (password,email)=>{
    const query ='SELECT * FROM operator WHERE password=? AND email=?;'
    return new Promise((resolve,reject)=>{
        connectDB.query(query,[password,email],(error,results,fields)=>{
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