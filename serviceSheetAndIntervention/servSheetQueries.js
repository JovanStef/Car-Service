const connectDB = require('../database');
getOnlyAllServShQuery = ()=>{
    const query = 'SELECT *FROM service_sheet;';
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

getAllServShQuery = ()=>{
    const query = 'SELECT *FROM service_sheet JOIN intervention ON service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID \
    INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID \
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
    const query = "INSERT INTO service_sheet (Service_S_Num, Date_Time, Cost, Service_toCar_ID,Service_S_delete,assessment_fee,confirmed,paid)\
    VALUES (FLOOR(RAND()*(20000-10000+1))+10000, NOW(),0,?,0,0,0,0);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Service_toCar_ID], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {

                resolve(results);
            }
        });
    });
};

confirmServShQuery = (sSerial,request) => {
    const query = "UPDATE service_sheet SET confirmed = ? WHERE Service_S_Num=?;";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.confirmed, sSerial], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {

                resolve(results);
            }
        });
    });
};

paidServShQuery = (sSerial,request) => {
    const query = "UPDATE service_sheet SET paid = ? WHERE Service_S_Num=?;";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.paid, sSerial], (error, results, fields) => {
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
    getOnlyAllServShQuery,
    getAllServShQuery,
    addNewServShQuery,
    confirmServShQuery,
    paidServShQuery,
    getServShDatabySerialQuery
}