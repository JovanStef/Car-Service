class Owner {
    constructor(obj) {
        this.ownerID = obj.Owner_ID;
        this.Name = obj.Name;
        this.Email = obj.email;
        this.Deleted = obj.Owner_delete;
        this.Cars=[];
    };
};

class Car {
    constructor(obj) {
        this.CarID = obj.Car_ID;
        this.Make = obj.Make;
        this.Model = obj.Model;
        this.Year = obj.Year;
        this.CarToOwner = obj.Car_toOwner_ID;
        this.Deleted = obj.Car_delete;
        this.ServiceSheet=[];
    };
};

class ServiceSheet {
    constructor(obj) {
        this.SheetID = obj.Service_S_ID;
        this.Number = obj.Service_S_Num;
        this.DateTime = obj.Date_Time;
        this.ServToCar = obj.Service_toCar_ID;
        this.Cost = 0;
        this.AssessmentFee = obj.assessment_fee;
        this.Confirmed = obj.confirmed;
        this.Paid = obj.paid;
        this.Deleted=obj.Service_S_delete;
        this.Intreventions=[];
    };
};

class Intervention {
    constructor(obj) {
        this.InterventionID = obj.Inter_ID;
        this.Type = obj.Inter_Type;
        this.Hours = obj.Inter_Hours;
        this.Description = obj.description;
        this.IntervToServ = obj.Inter_toServiceS_ID;
        this.InterventionCost = obj.interv_cost;
        this.Deleted = obj.Inter_delete;
        this.Mechanics=[];
    };
};

class Mechanic {
    constructor(obj) {
        this.MechanicID = obj.Mech_ID;
        this.Name = obj.Mech_Name;
        this.Type = obj.Mech_Type;
        this.MechToInterv = obj.Mech_toInter_ID;
        this.Deleted = obj.Mech_delete;
        this.Parts=[];
    };
};

class Part {
    constructor(obj) {
        this.PartID = obj.Part_ID;
        this.SerialNo = obj.Part_SerialNo;
        this.Type = obj.Part_Type;
        this.toInterv_ID = obj.Part_toInter_ID;
        this.Deleted = obj.Part_delete;
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