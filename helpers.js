const { Owner, Car, ServiceSheet, Intervention, Mechanic, Part } = require('./models');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

serviceSheetData = (obj)=>{
  let temp_sSheet = [];
  let temp_Interv = [];
  let temp_Mech = [];
  let temp_Parts = [];
obj.forEach(elem=>{
  S_temp = {
    SheetID: elem.Service_S_ID,
    Number: elem.Service_S_Num,
    DateTime: elem.Date_Time,
    ServToCar: elem.Service_toCar_ID,
    Deleted: elem.Service_S_delete,
    Intreventions:[]
  }
  temp_sSheet.push(S_temp);
  
  I_temp = {
    InterventionID: elem.Inter_ID,
    Type: elem.Inter_Type,
    Hours: elem.Inter_Hours,
    Description: elem.description,
    IntervToServ: elem.Inter_toServiceS_ID,
    Deleted: elem.Inter_delete,
    Mechanics: []
  }
  temp_Interv.push(I_temp);

  M_temp = {
    MechanicID: elem.Mech_ID,
    Name: elem.Mech_Name,
    Type: elem.Mech_Type,
    MechToInterv: elem.Mech_toInter_ID,
    Deleted: elem.Mech_delete,
    Parts: []
  }
  temp_Mech.push(M_temp);

  P_temp = {
    PartID: elem.Part_ID,
    Name: elem.Part_SerialNo,
    Type: elem.Part_Type,
    toInterv_ID: elem.Part_toInter_ID,
    Deleted: elem.Part_delete,
  }
  temp_Parts.push(P_temp)

});

temp_sSheet = temp_sSheet.filter((elem, index, self) => index === self.findIndex((i) => (i.SheetID === elem.SheetID)));
temp_Interv = temp_Interv.filter((elem, index, self) => index === self.findIndex((i) => (i.InterventionID === elem.InterventionID)));
temp_Mech = temp_Mech.filter((elem, index, self) => index === self.findIndex((i) => (i.MechanicID === elem.MechanicID)));
temp_Parts = temp_Parts.filter((elem, index, self) => index === self.findIndex((i) => (i.PartID === elem.PartID)));

temp_Mech.forEach(m_elem=>{
  temp_Parts.forEach(p_elem=>{
    if(m_elem.MechToInterv == p_elem.toInterv_ID){
m_elem.Parts.push(p_elem)
    }
  });
});

temp_Interv.forEach(i_elem=>{
  temp_Mech.forEach(m_elem=>{
if(i_elem.IntervToServ == m_elem.MechToInterv){
  i_elem.Mechanics.push(m_elem)
}
  });
});

temp_sSheet.forEach(s_elem=>{
  temp_Interv.forEach(i_elem=>{
    if(s_elem.SheetID == i_elem.IntervToServ){
      s_elem.Intreventions.push(i_elem)
    }
  })
})

// console.log(temp_sSheet)
// console.log(temp_Interv)
// console.log(temp_Mech)
// console.log(temp_Parts)

return temp_sSheet
}

allData = (obj)=>{
  let temp_Owners = [];
  let temp_Cars = [];
  let temp_sSheet = [];
  let temp_Interv = [];
  let temp_Mech = [];
  let temp_Parts = [];
obj.forEach(elem=>{
  O_temp = {
    ownerID: elem.Owner_ID,
    Name: elem.Name,
    Email: elem.email,
    Deleted: elem.Owner_delete,
    Cars: []
  }
  temp_Owners.push(O_temp);

  C_temp = {
    CarID: elem.Car_ID,
    Make: elem.Make,
    Model: elem.Model,
    Year: elem.Year,
    CarToOwner: elem.Car_toOwner_ID,
    Deleted: elem.Car_delete,
    ServiceSheet: []
  }
  temp_Cars.push(C_temp);

  S_temp = {
    SheetID: elem.Service_S_ID,
    Number: elem.Service_S_Num,
    DateTime: elem.Date_Time,
    ServToCar: elem.Service_toCar_ID,
    Deleted: elem.Service_S_delete,
    Intreventions:[]
  }
  temp_sSheet.push(S_temp);
  
  I_temp = {
    InterventionID: elem.Inter_ID,
    Type: elem.Inter_Type,
    Hours: elem.Inter_Hours,
    Description: elem.description,
    IntervToServ: elem.Inter_toServiceS_ID,
    InterventionCost: elem.interv_cost,
    Deleted: elem.Inter_delete,
    Mechanics: []
  }
  temp_Interv.push(I_temp);

  M_temp = {
    MechanicID: elem.Mech_ID,
    Name: elem.Mech_Name,
    Type: elem.Mech_Type,
    MechToInterv: elem.Mech_toInter_ID,
    Deleted: elem.Mech_delete,
    Parts: []
  }
  temp_Mech.push(M_temp);

  P_temp = {
    PartID: elem.Part_ID,
    Name: elem.Part_SerialNo,
    Type: elem.Part_Type,
    toInterv_ID: elem.Part_toInter_ID,
    Deleted: elem.Part_delete,
  }
  temp_Parts.push(P_temp)

});

temp_Owners = temp_Owners.filter((elem, index, self) => index === self.findIndex((i) => (i.ownerID === elem.ownerID)));
temp_Cars = temp_Cars.filter((elem, index, self) => index === self.findIndex((i) => (i.CarID === elem.CarID)));
temp_sSheet = temp_sSheet.filter((elem, index, self) => index === self.findIndex((i) => (i.SheetID === elem.SheetID)));
temp_Interv = temp_Interv.filter((elem, index, self) => index === self.findIndex((i) => (i.InterventionID === elem.InterventionID)));
temp_Mech = temp_Mech.filter((elem, index, self) => index === self.findIndex((i) => (i.MechanicID === elem.MechanicID)));
temp_Parts = temp_Parts.filter((elem, index, self) => index === self.findIndex((i) => (i.PartID === elem.PartID)));

temp_Mech.forEach(m_elem=>{
  temp_Parts.forEach(p_elem=>{
    if(m_elem.MechToInterv == p_elem.toInterv_ID){
m_elem.Parts.push(p_elem)
    }
  });
});

temp_Interv.forEach(i_elem=>{
  temp_Mech.forEach(m_elem=>{
if(i_elem.InterventionID == m_elem.MechToInterv){
  i_elem.Mechanics.push(m_elem)
}
  });
});

temp_sSheet.forEach(s_elem=>{
  temp_Interv.forEach(i_elem=>{
    if(s_elem.SheetID == i_elem.IntervToServ){
      s_elem.Intreventions.push(i_elem)
    }
  });
});

temp_Cars.forEach(c_elem=>{
  temp_sSheet.forEach(s_elem=>{
    if(c_elem.CarID == s_elem.ServToCar){
      c_elem.ServiceSheet.push(s_elem)
    }
  });
});

temp_Owners.forEach(o_elem=>{
  temp_Cars.forEach(c_elem=>{
    if(o_elem.ownerID == c_elem.CarToOwner){
o_elem.Cars.push(c_elem);
    }
  })
})

// console.log(temp_sSheet)
// console.log(temp_Interv)
// console.log(temp_Mech)
// console.log(temp_Parts)

return temp_Owners
}
emailValidator = (email) => {

  var validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!validEmail.test(email)) {
    return false
  }
  else {
    return true
  }
};

keyWordValidator = (obj) => {
  let props = Object.values(obj).map(elem => {
    return elem.toString().toLowerCase()
  });
  let keyWords = ["mechanic", "bodywork", "electric"];
  let bool = props.some(prop => {
    let word = keyWords.find(word => {
      // console.log(prop, word)
      if (prop == word) {
        return true
      } else {
        return false
      }
    })
    if (word) {
      return true
    } else {
      return false
    }
  });
  return bool

};

responseError = ( resVar, message) => {
  if (resVar.affectedRows == 0 || resVar.length == 0) {
    return message
  }

}

logginRoleDesc = (user, operator, owner, pass) => {
  if (operator.length != 0) {
    user = operator;
  } else if (owner.length != 0) {
    user = owner
  } else {
    var error = new Error("wrong credentials");
    error.status = 404;
    return error.message
  }
  user = user[0];
  let role = Object.keys(user)[0].split('_');
  let checkPass = bcrypt.compareSync(pass, user.password)
  if (checkPass) {
    var privateKey = 'owner'
    var token = jwt.sign({ user }, privateKey, { expiresIn: '24h' });
    let userToSend = {
      Name: user.Name,
      Email: user.email,
      Token: token,
      role: role[0]
    }
    return userToSend
  } else {
    return "Wrong password"

  }
}

module.exports = {
  emailValidator,
  keyWordValidator,
  responseError,
  logginRoleDesc,
  serviceSheetData,
  allData
};