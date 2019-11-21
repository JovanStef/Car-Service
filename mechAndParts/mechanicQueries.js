const connectDB = require('../database');

getAllMechanicsQuery = () => {
    const query = 'SELECT *FROM mechanic';
    return new Promise((resolve, reject) => {
        connectDB.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

addNewMechQuery = (request) => {
    const query = "INSERT INTO mechanic (Mech_Name,Mech_Type,Mech_toCar_ID,Mech_toInter_ID)VALUES (?,?,?,?);";
    return new Promise((resolve, reject) => {
        connectDB.query(query, [request.Mech_Name, request.Mech_Type, request.Mech_toCar_ID, request.Mech_toInter_ID], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {

                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllMechanicsQuery,
    addNewMechQuery
}