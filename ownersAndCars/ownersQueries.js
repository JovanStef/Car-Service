const connectDB = require('../database');

getAllOwnersAndTheirCarsQuery = ()=>{
    const query = 'SELECT * FROM owner INNER JOIN car ON owner.Owner_ID=car.Car_toOwner_ID INNER JOIN service_sheet ON car.Car_ID=service_sheet.Service_toCar_ID;';
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

getOwnersByEmailQuery = (email)=>{
    const query = 'SELECT * FROM owner INNER JOIN car ON owner.Owner_ID=car.Car_toOwner_ID\
    INNER JOIN service_sheet ON car.Car_ID=service_sheet.Service_toCar_ID\
    INNER JOIN intervention ON service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID\
    INNER JOIN mechanic ON intervention.Inter_ID=mechanic.Mech_toInter_ID\
    INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID WHERE owner.email=?;';
    return new Promise ((resolve,reject)=>{
        connectDB.query(query,[email],(error,results,fields)=>{
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

getOwnerCredentials = (password,email)=>{
    const query ='SELECT * FROM owner WHERE password=? AND email=?;'
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

getAllDataForOwnerIDQuery = (password,email)=>{
    const query = 'SELECT * FROM owner INNER JOIN car ON owner.Owner_ID=car.Car_toOwner_ID\
    INNER JOIN service_sheet ON car.Car_ID=service_sheet.Service_toCar_ID\
    INNER JOIN intervention ON service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID\
    INNER JOIN mechanic ON intervention.Inter_ID=mechanic.Mech_toInter_ID\
    INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID WHERE owner.password = ? AND owner.email=?;';
    return new Promise ((resolve,reject)=>{
        connectDB.query(query,[password,email],(error,results,fields)=>{
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

softDeleteOwnerDataQuery = (id,deleted)=>{
const query = "UPDATE owner,car,service_sheet,intervention,mechanic,parts SET owner.Owner_delete=? ,car.Car_delete = ?, service_sheet.Service_S_delete = ? , intervention.Inter_delete = ? , mechanic.Mech_delete = ?, parts.Part_delete = ? WHERE owner.Owner_ID = ? AND car.Car_toOwner_ID=owner.Owner_ID AND car.Car_ID=service_sheet.Service_toCar_ID AND service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID AND intervention.Inter_ID=mechanic.Mech_toInter_ID AND intervention.Inter_ID=parts.Part_toInter_ID; ";
return new Promise((resolve, reject) => {
    connectDB.query(query, [deleted,deleted,deleted,deleted,deleted,deleted,id], (error, results, fields) => {
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
    getOwnersByEmailQuery,
    addNewOwnerQuery,
    getAllDataForOwnerIDQuery,
    softDeleteOwnerDataQuery,
    getOwnerCredentials,
    getAllOwnersAndTheirCarsQuery
}