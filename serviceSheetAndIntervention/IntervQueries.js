const connectDB = require('../database');

getOnlyAllIntervQuery = ()=>{
    const query = 'SELECT *FROM intervention;';
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

getAllIntervQuery = ()=>{
    const query = 'SELECT *FROM intervention\
    INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID\
    INNER JOIN mechanic ON intervention.Inter_ID=mechanic.Mech_toInter_ID;';
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
    const query = "INSERT INTO intervention (Inter_Type,Inter_Hours,Inter_toServiceS_ID,Inter_delete,description,interv_cost)VALUES (?,?,?,0,?,?);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Inter_Type, request.Inter_Hours, request.Inter_toServiceS_ID,request.description,request.interv_cost], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {

                resolve(results);
            }
        });
    });
};

updateIntervQuery = (request,id) => {
    const query = "UPDATE intervention SET Inter_Type=?,Inter_Hours = ? WHERE Inter_toServiceS_ID=?;";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Inter_Type, request.Inter_Hours,id], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                if(results.affectedRows == 0){
                    message = `Intervention for Service Sheet with ID ${id} does not exist!`
                    reject({message:message})
                }

                resolve(results);
            }
        });
    });
};

softDeleteIntervQuery = (id,deleted)=>{
    const query = "UPDATE intervention,mechanic,parts SET intervention.Inter_delete = ? , parts.Part_delete = ? WHERE intervention.Inter_ID = ? AND intervention.Inter_ID=parts.Part_toInter_ID;";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [deleted,deleted,id], (error, results, fields) => {
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
    getOnlyAllIntervQuery,
    getAllIntervQuery,
    addNewIntervQuery,
    updateIntervQuery,
    softDeleteIntervQuery
}