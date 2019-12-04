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
  let mechList = [];
  let intervList = [];
  let sSheetsList = []
  let carsList = []
  let ownerList = []

  // obj.forEach((obj, index) => {
  //   temp = {
  //     PartID: part.obj[index].Part_ID,
  //     Name: part.obj[index].Part_SerialNo,
  //     Type: part.obj[index].Part_Type,
  //     toInterv_ID:part.obj[index].Part_toInter_ID,
  //     Deleted:part.obj[index].Part_delete,
  //   }
  //   parts.push(temp);
  // });
  // parts = parts.filter((elem, index, self) => index === self.findIndex((i) => (
  //   i.PartID === elem.PartID
  // ))
  // );
  // obj.forEach((obj, index) => {
  //   temp = {
  //     MechanicID: mech.obj[index].Mech_ID,
  //     Name: mech.obj[index].Mech_Name,
  //     Type: mech.obj[index].Mech_Type,
  //     Deleted:mech.obj[index].Mech_delete,
  //     Parts: parts
  //   }
  //   mechList.push(temp);
  // });

  // mechList = mechList.filter((elem, index, self) =>
  // index === self.findIndex((i) => (
  //   i.MechanicID === elem.MechanicID
  //   ))
  //   );

  //   obj.forEach((obj, index) => {
  //     temp = {
  //       IterventionID: interv.obj[index].Inter_ID,
  //       Type: interv.obj[index].Inter_Type,
  //       Hours: interv.obj[index].Inter_Hours,
  //       Description:interv.obj[index].description,
  //       Deleted:interv.obj[index].Inter_delete,
  //       Mechanics: mechList
  //     }
  //     intervList.push(temp);

  //   });

  //   intervList = intervList.filter((elem, index, self) => index === self.findIndex((i) => (
  //     i.IterventionID === elem.IterventionID
  //     ))
  //     );

  //     obj.forEach((obj, index) => {

  //       temp = {
  //         SheetID: servSh.obj[index].Service_S_ID,
  //         Number: servSh.obj[index].Service_S_Num,
  //         DateTime: servSh.obj[index].Date_Time,
  //         Cost: servSh.obj[index].Cost,
  //         Deleted:servSh.obj[index].Service_S_delete,
  //         Intreventions: intervList
  //       }
  //       sSheetsList.push(temp)

  //     });
  //     sSheetsList = sSheetsList.filter((elem, index, self) => index === self.findIndex((i) => (
  //       i.SheetID === elem.SheetID
  //       ))
  //       );
  //       obj.forEach((obj, index) => {
  //         temp = {
  //           CarID: car.obj[index].Car_ID,
  //           Make: car.obj[index].Make,
  //           Model: car.obj[index].Model,
  //           Year: car.obj[index].Year,
  //           Deleted:car.obj[index].Car_delete,
  //           ServiceSheet: sSheetsList
  //         }
  //         carsList.push(temp)
  //       });
  //       carsList = carsList.filter((elem, index, self) => index === self.findIndex((i) => (
  //         i.CarID === elem.CarID
  //         ))
  //         );

  //         obj.forEach((obj,index)=>{
  //           temp = {
  //             ownerID:owner.obj[index].Owner_ID,
  //             Name: owner.obj[index].Name,
  //             Email: owner.obj[index].email,
  //             Deleted:owner.obj[index].Owner_delete,
  //             Cars: carsList
  //           }
  //           ownerList.push(temp)
  //         })
  //         ownerList = ownerList.filter((elem, index, self) => index === self.findIndex((i) => (
  //           i.ownerID === elem.ownerID
  //           ))
  //           );
  obj.forEach((obj, index) => {
    temp = {
      ownerID: owner.obj[index].Owner_ID,
      Name: owner.obj[index].Name,
      Email: owner.obj[index].email,
      Deleted: owner.obj[index].Owner_delete,
      Cars: carsList
    }
    ownerList.push(temp)
  })
  ownerList = ownerList.filter((elem, index, self) => index === self.findIndex((i) => (
    i.ownerID === elem.ownerID
  ))
  );

  obj.forEach((obj, index) => {
    ownerList.forEach((elem, i) => {
      if (car.obj[index].Car_toOwner_ID == elem.ownerID) {
        temp = {
          CarID: car.obj[index].Car_ID,
          Make: car.obj[index].Make,
          Model: car.obj[index].Model,
          Year: car.obj[index].Year,
          Deleted: car.obj[index].Car_delete,
          ServiceSheet: sSheetsList
        }
        elem.Cars.push(temp)
        elem.Cars = elem.Cars.filter((elem, index, self) => index === self.findIndex((i) => (
          i.CarID === elem.CarID
        ))
        );
      }
    })
  });
  obj.forEach((obj, index) => {
    ownerList[0].Cars.forEach((elem, i) => {
      if (servSh.obj[index].Service_toCar_ID == elem.CarID) {
        temp = {
          SheetID: servSh.obj[index].Service_S_ID,
          Number: servSh.obj[index].Service_S_Num,
          DateTime: servSh.obj[index].Date_Time,
          Cost: servSh.obj[index].Cost,
          ServToCar: servSh.obj[index].Service_toCar_ID,
          Deleted: servSh.obj[index].Service_S_delete,
          Intreventions: intervList
        }
        elem.ServiceSheet.push(temp)
      }
      // remove non matching FK = PK 
      elem.ServiceSheet.forEach(ss=>{
        if(ss.ServToCar !=elem.CarID){
          elem.ServiceSheet.pop(ss)        
        }
      });
      // remove duplicate entries
      elem.ServiceSheet = elem.ServiceSheet.filter((elem, index, self) => index === self.findIndex((i) => (
        i.SheetID === elem.SheetID
      ))
      );
    })
  });
  obj.forEach((obj, index) => {
    ownerList[0].Cars.forEach((elem, i) => {
      elem.ServiceSheet.forEach(sS => {

        if (interv.obj[index].Inter_toServiceS_ID == sS.SheetID) {
          temp = {
            InterventionID: interv.obj[index].Inter_ID,
            Type: interv.obj[index].Inter_Type,
            Hours: interv.obj[index].Inter_Hours,
            Description: interv.obj[index].description,
            IntervToServ:interv.obj[index].Inter_toServiceS_ID,
            Deleted: interv.obj[index].Inter_delete,
            Mechanics: mechList
          }
          sS.Intreventions.push(temp)
        }
        sS.Intreventions.forEach(ii=>{
          if(ii.IntervToServ !=sS.SheetID){
            sS.Intreventions.pop(ii)        
          }
        });
      })
      elem.ServiceSheet[0].Intreventions = elem.ServiceSheet[0].Intreventions.filter((elem, index, self) => index === self.findIndex((i) => (
        i.IterventionID === elem.IterventionID
      ))
      );
    })
  });
  obj.forEach((obj, index) => {
  ownerList[0].Cars.forEach((elem, i) => {
    elem.ServiceSheet.forEach((sS,e) => {
      
      console.log(sS.Intreventions[0].InterventionID)
      if (mech.obj[index].Mech_toInter_ID == sS.Intreventions[e].InterventionID) {
        temp = {
          MechanicID: mech.obj[index].Mech_ID,
          Name: mech.obj[index].Mech_Name,
          Type: mech.obj[index].Mech_Type,
          MechToInterv:mech.obj[index].Mech_toInter_ID,
          Deleted:mech.obj[index].Mech_delete,
          Parts: parts
        }
    sS.Intreventions[e].Mechanics.push(temp);
  }
      sS.Intreventions[e].Mechanics.forEach(ii=>{
              if(ii.MechToInterv !=sS.Intreventions[e].InterventionID){
                sS.Intreventions[e].Mechanics.pop(ii)        
              }
            });

  sS.Intreventions[e].Mechanics = sS.Intreventions[e].Mechanics.filter((elem, index, self) => index === self.findIndex((i) => (
  i.MechanicID === elem.MechanicID
))
);
})
    })
  })


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

responseError = (obj, resVar, message) => {
  if (obj.affectedRows == 0 || resVar.length == 0) {
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
  if (user.password === pass) {
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