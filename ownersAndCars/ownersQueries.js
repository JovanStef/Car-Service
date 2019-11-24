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

getAllDataForOwnersQuery = ()=>{
    const query = 'SELECT * FROM owner INNER JOIN car ON owner.Owner_ID=car.Car_toOwner_ID\
    INNER JOIN service_sheet ON car.Car_ID=service_sheet.Service_toCar_ID\
    INNER JOIN intervention ON service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID\
    INNER JOIN mechanic ON intervention.Inter_ID=mechanic.Mech_toInter_ID\
    INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID WHERE owner.Owner_ID = 3;';
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

addNewOwnerQuery = (request) => {
    const query = "INSERT INTO owner (Name, email, password)VALUES (?,?,?);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Name, request.email, request.password], (error, results, fields) => {
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
    getAllOwnersQuery,
    addNewOwnerQuery,
    getAllDataForOwnersQuery
}