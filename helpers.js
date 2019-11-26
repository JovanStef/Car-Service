const { Owner, Car, ServiceSheet, Intervention, Mechanic, Part } = require('./models');


ownersDataJSON = (obj) => {
  let owner = new Owner(obj[0]);
  let car = new Car(obj);
  let servSh = new ServiceSheet(obj);
  let interv = new Intervention(obj);
  let mech = new Mechanic(obj);
  let part = new Part(obj);
  // console.log(obj)

  // removeDuplicates = (arr,prop)=>{
  //      arr1 = arr.filter((elem, index, self) => index === self.findIndex((t) => (
  //          t.prop === elem.prop 
  //          ))
  //          );
  //     return arr1
  // }
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
    i.Part_ID === elem.Part_ID
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

  // mechList= removeDuplicates(mechList,'Mech_ID')
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
  let ownerData = {
    Name: owner.name,
    Email: owner.email,
    Cars: carsList
  }
  return ownerData
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
  let props = ["Inter_Type", "Mech_Type", "Part_Type"];
  let keyWords = ["mechanic", "bodywork", "electric"];
  let bool = props.some(prop => {
    let word = keyWords.find(word => {
      console.log(obj[prop],word)
      if (obj[prop] == word) {
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

module.exports = {
  ownersDataJSON,
  emailValidator,
  keyWordValidator
};