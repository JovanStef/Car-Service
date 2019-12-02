const { Owner, Car, ServiceSheet, Intervention, Mechanic, Part } = require('./models');
var jwt = require('jsonwebtoken');



ownersDataJSON = (obj) => {
  let owner = new Owner(obj);
  let car = new Car(obj);
  let servSh = new ServiceSheet(obj);
  let interv = new Intervention(obj);
  let mech = new Mechanic(obj);
  let part = new Part(obj);
  let parts = [];
  obj.forEach((obj, index) => {
    temp = {
      PartID: part.obj[index].Part_ID,
      Name: part.obj[index].Part_SerialNo,
      Type: part.obj[index].Part_Type
    }
    parts.push(temp);
  });
  parts = parts.filter((elem, index, self) => index === self.findIndex((i) => (
    i.PartID === elem.PartID
  ))
  );
  let mechList = [];
  obj.forEach((obj, index) => {
    temp = {
      MechanicID: mech.obj[index].Mech_ID,
      Name: mech.obj[index].Mech_Name,
      Type: mech.obj[index].Mech_Type,
      Parts: parts
    }
    mechList.push(temp);
  });
  
  mechList = mechList.filter((elem, index, self) =>
  index === self.findIndex((i) => (
    i.MechanicID === elem.MechanicID
    ))
    );
    
    let intervList = [];
    obj.forEach((obj, index) => {
      temp = {
        IterventionID: interv.obj[index].Inter_ID,
        Type: interv.obj[index].Inter_Type,
        Hours: interv.obj[index].Inter_Hours,
        Description:interv.obj[index].description,
        Mechanics: mechList
      }
      intervList.push(temp);
      
    });
    
    intervList = intervList.filter((elem, index, self) => index === self.findIndex((i) => (
      i.IterventionID === elem.IterventionID
      ))
      );
      
      let sSheetsList = []
      obj.forEach((obj, index) => {
        
        temp = {
          SheetID: servSh.obj[index].Service_S_ID,
          Number: servSh.obj[index].Service_S_Num,
          DateTime: servSh.obj[index].Date_Time,
          Cost: servSh.obj[index].Cost,
          Intreventions: intervList
        }
        sSheetsList.push(temp)
        
      });
      sSheetsList = sSheetsList.filter((elem, index, self) => index === self.findIndex((i) => (
        i.SheetID === elem.SheetID
        ))
        );
        let carsList = []
        obj.forEach((obj, index) => {
          temp = {
            CarID: car.obj[index].Car_ID,
            Make: car.obj[index].Make,
            Model: car.obj[index].Model,
            Year: car.obj[index].Year,
            ServiceSheet: sSheetsList
          }
          carsList.push(temp)
        });
        carsList = carsList.filter((elem, index, self) => index === self.findIndex((i) => (
          i.CarID === elem.CarID
          ))
          );
          let ownerList = []
          
          obj.forEach((obj,index)=>{
            temp = {
              ownerID:obj.Owner_ID,
              Name: obj.Name,
              Email: obj.email,
              Cars: carsList
            }
            ownerList.push(temp)
          })
          ownerList = ownerList.filter((elem, index, self) => index === self.findIndex((i) => (
            i.ownerID === elem.ownerID
            ))
            );

  let ownerData = {
    ID:owner.ownerID,
    Name: owner.name,
    Email: owner.email,
    Cars: carsList
  }
  return ownerList
};

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
      console.log(prop, word)
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

  //   let keyWords = ["mechanic","bodywork","electric"];
  //   let bool = keyWords.some(word=>{
  //     console.log(word , bodyWord)
  //     if(word == bodyWord){
  //       return true
  //     }else{
  //       return false
  //     }
  // });
  //   console.log(bool)
  //   return bool
};

responseError = (obj,resVar,message)=>{
  if(obj.affectedRows == 0 || resVar.length == 0){
    return message
  }

}

logginRoleDesc = (user,operator,owner,pass)=>{
  if(operator.length != 0){
    user=operator;
}else if(owner.length != 0){
    user = owner
}else{
  var error = new Error("wrong credentials");
  error.status = 404;
  return error.message
}
user = user[0];
let role = Object.keys(user)[0].split('_');
if (user.password === pass) {
    var privateKey = 'owner'
    var token = jwt.sign({user}, privateKey,{ expiresIn: '24h' });
    let userToSend = {
        Name:user.Name,
        Email:user.email,
        Token:token,
        role:role[0]
    }
    return userToSend
} else {
  return false

}
}

module.exports = {
  ownersDataJSON,
  emailValidator,
  keyWordValidator,
  responseError,
  logginRoleDesc
};