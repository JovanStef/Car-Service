-- UPDATE owner,car,service_sheet,intervention,mechanic,parts
-- SET owner.Owner_delete=1 ,car.Car_delete = 1, service_sheet.Service_S_delete = 1 , intervention.Inter_delete = 1 , mechanic.Mech_delete = 1, parts.Part_delete = 1
-- WHERE owner.Owner_ID = 1
-- AND car.Car_toOwner_ID=owner.Owner_ID
-- AND car.Car_ID=service_sheet.Service_toCar_ID
-- AND service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID
-- AND intervention.Inter_ID=mechanic.Mech_toInter_ID
-- AND intervention.Inter_ID=parts.Part_toInter_ID;

UPDATE intervention,mechanic,parts
SET intervention.Inter_delete = 0 , mechanic.Mech_delete = 0, parts.Part_delete = 0
WHERE intervention.Inter_ID = 0
AND intervention.Inter_ID=mechanic.Mech_toInter_ID
AND intervention.Inter_ID=parts.Part_toInter_ID;

INSERT INTO owner (Name, email, password)
VAlUES("Carlo","carlo@mail.com","carlo");
SELECT Owner_ID FROM owner ORDER BY Owner_ID DESC LIMIT 1 into @owner;
INSERT INTO car (Make,Model,Year,Car_toOwner_ID) 
VALUES ("Opel","Corsa",2000,@owner);

SET SQL_SAFE_UPDATES=1;
SELECT * FROM owner WHERE owner.email= "nonnita@mail.com";

UPDATE operator SET password = "$2a$05$Nsxy.AGKvb1K9GP2eAeUxe8DWMfUsL72xVeAzmrWOsP9kGJf5kGOK";