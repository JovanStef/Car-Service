const connectDB = require('../database');
getOnlyAllCarsQuery = ()=>{
    const query = 'SELECT * FROM car;';
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

getAllCarsQuery = ()=>{
    const query = 'SELECT * FROM car\
    INNER JOIN service_sheet ON car.Car_ID=service_sheet.Service_toCar_ID\
    INNER JOIN intervention ON service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID\
    INNER JOIN mechanic ON intervention.Inter_ID=mechanic.Mech_toInter_ID\
    INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID;';
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

addNewCarQuery = (request) => {
    const query = "INSERT INTO car (Make,Model,Year,Car_toOwner_ID,Car_delete)VALUES (?,?,?,?,0);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Make, request.Model, request.Year, request.Car_toOwner_ID], (error, results, fields) => {
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
    getOnlyAllCarsQuery,
    getAllCarsQuery,
    addNewCarQuery
}