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
getServShDatabySerialQuery = (sS_Num)=>{
    const query = 'SELECT *FROM service_sheet JOIN intervention ON service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID \
    INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID \
    INNER JOIN mechanic ON intervention.Inter_ID=mechanic.Mech_toInter_ID \
    WHERE intervention.Inter_delete = 0 AND service_sheet.Service_S_Num=?;';
    return new Promise ((resolve,reject)=>{
        connectDB.query(query,[sS_Num],(error,results,fields)=>{
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

addNewServShQuery = (request) => {
    const query = "INSERT INTO service_sheet (Service_S_Num, Date_Time, Cost, Service_toCar_ID)VALUES (FLOOR(RAND()*(20000-10000+1))+10000, NOW(),?,?);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Cost, request.Service_toCar_ID], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {

                resolve(results);
            }
        });
    });
};

updateServShQuery = (id,request) => {
    const query = "UPDATE service_sheet SET Date_Time = NOW(), Cost = ? WHERE Service_S_ID=?;";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Cost, id], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                if(results.affectedRows == 0){
                    reject(`Service sheet with ID ${id} does not exist!`)
                }

                resolve(results);
            }
        });
    });
};
module.exports={
    getAllServShQuery,
    addNewServShQuery,
    updateServShQuery,
    getServShDatabySerialQuery
}