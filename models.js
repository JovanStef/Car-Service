class Owner {
    constructor(obj) {
        this.obj = obj;
        this.ownerID = obj.Owner_ID;
        this.name = obj.Name;
        this.email = obj.email;
        this.Owner_delete = obj.Owner_delete;
    };
    toJson(){
        this.arr = [];
        obj.forEach(obj => {
            var temp = {
                Owner_Name: obj.Name,
                Owner_Email: obj.email,
            }
            this.arr.push(temp);
        });
        return this.arr
    };
};

class Car {
    constructor(obj) {
        this.obj = obj;
        this.carID = obj.Car_ID;
        this.Make = obj.Make;
        this.Model = obj.Model;
        this.Year = obj.Year;
        this.CartoOwnerID = obj.Car_toOwner_ID;
        this.Car_delete = obj.Car_delete
    };
    toJson() {
        this.arr = [];
        this.obj.forEach(obj => {
            var temp = {
                Car_Make: obj.Make,
                Car_Model: obj.Model,
                Car_Year: obj.Year,
            }
            this.arr.push(temp);
        });
        return this.arr
    };
};

class ServiceSheet {
    constructor(obj) {
        this.obj = obj;
        this.ServSheetID = obj.Service_S_ID;
        this.Service_S_Num = obj.Service_S_Num;
        this.Date_Time = obj.Date_Time;
        this.Cost = obj.Cost;
        this.Service_toCar_ID = obj.Service_toCar_ID;
        this.assessment_fee = obj.assessment_fee;
        this.Service_S_delete=obj.Service_S_delete;
    };
    toJson() {
        this.arr = [];
        this.obj.forEach(obj => {
            var temp = {
                Service_S_Num: obj.Service_S_Num,
                Cost: obj.Cost,
                        }
            this.arr.push(temp);
        });
        return this.arr
    };
};

class Intervention {
    constructor(obj) {
        this.obj = obj;
        this.InterID = obj.Inter_ID;
        this.InterType = obj.Inter_Type;
        this.InterHours = obj.Inter_Hours;
        this.IntertoServiceS_ID = obj.Inter_toServiceS_ID;
        this.Interv_Description = obj.description;
        this.Inter_delete = obj.Inter_delete;
    };
};

class Mechanic {
    constructor(obj) {
        this.obj = obj;
        this.MechID = obj.Mech_ID;
        this.MechName = obj.Mech_Name;
        this.MechType = obj.Mech_Type;
        this.MechtoInter_ID = obj.Mech_toInter_ID;
        this.Mech_delete = obj.Mech_delete;
    };
};

class Part {
    constructor(obj) {
        this.obj = obj;
        this.Part_ID = obj.Part_ID;
        this.Part_SerialNo = obj.Part_SerialNo;
        this.Part_Type = obj.Part_Type;
        this.Part_toInter_ID = obj.Part_toInter_ID;
        this.Part_delete = obj.Part_delete;
    };
};

module.exports = {
    Owner,
    Car,
    ServiceSheet,
    Intervention,
    Mechanic,
    Part
}