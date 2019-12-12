var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Owner,Car,ServiceSheet,Intervention,Mechanic,Part}=require('./models');

compareID=(arr1,arr2,arr3,id1,id2)=>{
  arr1.forEach(m_elem => {
    arr2.forEach(p_elem => {
      if (m_elem[id1] == p_elem[id2]) {
        m_elem[arr3].push(p_elem)
      }
    });
  });
};

function allData(obj) {
  let temp_Owners = [];
  let temp_Cars = [];
  let temp_sSheet = [];
  let temp_Interv = [];
  let temp_Mech = [];
  let temp_Parts = [];
  obj.forEach(elem => {

    let O_temp = new Owner(elem)
    temp_Owners.push(O_temp);

    let C_temp = new Car(elem)
    temp_Cars.push(C_temp);

    let S_temp = new ServiceSheet(elem)
    temp_sSheet.push(S_temp);

    let I_temp= new Intervention(elem)
    temp_Interv.push(I_temp);

    let M_temp = new Mechanic(elem)
    temp_Mech.push(M_temp);

   let P_temp = new Part(elem)
    temp_Parts.push(P_temp)

  });

  temp_Owners = temp_Owners.filter((elem, index, self) => index === self.findIndex((i) => (i.ownerID === elem.ownerID)));
  temp_Cars = temp_Cars.filter((elem, index, self) => index === self.findIndex((i) => (i.CarID === elem.CarID)));
  temp_sSheet = temp_sSheet.filter((elem, index, self) => index === self.findIndex((i) => (i.SheetID === elem.SheetID)));
  temp_Interv = temp_Interv.filter((elem, index, self) => index === self.findIndex((i) => (i.InterventionID === elem.InterventionID)));
  temp_Mech = temp_Mech.filter((elem, index, self) => index === self.findIndex((i) => (i.MechanicID === elem.MechanicID)));
  temp_Parts = temp_Parts.filter((elem, index, self) => index === self.findIndex((i) => (i.PartID === elem.PartID)));

  compareID(temp_Mech,temp_Parts,'Parts','MechToInterv','toInterv_ID');

  compareID(temp_Interv,temp_Mech,'Mechanics','InterventionID','MechToInterv');

  temp_sSheet.forEach(s_elem => {
    let cost = 0;
    temp_Interv.forEach(i_elem => {
      if (s_elem.SheetID == i_elem.IntervToServ) {
        cost += i_elem.InterventionCost
        s_elem.Intreventions.push(i_elem)
      }
    })
    s_elem.Cost = cost
  });

  compareID(temp_Cars,temp_sSheet,'ServiceSheet','CarID','ServToCar');

  compareID(temp_Owners,temp_Cars,'Cars','ownerID','CarToOwner');

  this.owner = function () {
    return temp_Owners
  };
  this.car = function () {
    return temp_Cars
  };
  this.serviceS = function () {
    return temp_sSheet
  };
  this.intervention = function () {
    return temp_Interv
  };
  this.mechanic = function () {
    return temp_Mech
  };
  this.part = function () {
    return temp_Parts
  };

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

responseError = (resVar, message) => {
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
  allData
};