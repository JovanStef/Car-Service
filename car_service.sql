-- CREATE TABLE IF NOT EXISTS operator(
-- Operator_ID INT AUTO_INCREMENT PRIMARY KEY,
-- Name VARCHAR(255) NOT NULL,
-- email VARCHAR(255) NOT NULL,
-- password VARCHAR(255) NOT NULL DEFAULT "password"
-- );
-- 
-- INSERT INTO operator (Name, email, password)
-- VAlUES("Operator_1","operator@mail.com","operator");


-- CREATE TABLE IF NOT EXISTS owner(
-- Owner_ID INT AUTO_INCREMENT PRIMARY KEY,
-- Name VARCHAR(255) NOT NULL,
-- email VARCHAR(255) NOT NULL,
-- password VARCHAR(255) NOT NULL DEFAULT "password"
-- );
-- INSERT INTO owner (Name, email, password)
-- VAlUES("Nonnita","nonnita@mail.com","nonnita"),
-- ("Mabel","mabel@mail.com","mabel"),
-- ("Thaddeaus","thaddeaus@mail.com","thaddeaus"),
-- ("Orianna","orianna@mail.com","orianna"),
-- ("Virgil","virgil@mail.com","virgil"),
-- ("Sabana","sabana@mail.com","sabana"),
-- ("Calix","calix@mail.com","calix"),
-- ("Carla","carla@mail.com","carla"),
-- ("Flavia","flavia@mail.com","flavia"),
-- ("Juniper","juniper@mail.com","juniper"),
-- ("Marcade","marcade@mail.com","marcade"),
-- ("Noble","noble@mail.com","noble"),
-- ("Lavinia","lavinia@mail.com","lavinia");
-- 
-- ALTER TABLE parts ADD UNIQUE (Part_SerialNo);
-- UPDATE parts SET Part_SerialNo = 648 WHERE Part_ID = 20;
-- DELETE FROM owner WHERE Owner_ID >13;
-- 
-- CREATE TABLE IF NOT EXISTS car(
-- Car_ID INT AUTO_INCREMENT PRIMARY KEY,
-- Make VARCHAR(255) NOT NULL,
-- Model VARCHAR(255),
-- Year INT,
-- Car_toOwner_ID INT NOT NULL,
-- FOREIGN KEY (Car_toOwner_ID) REFERENCES owner(Owner_ID)
-- );
-- 
-- INSERT INTO car (Make,Model,Year,Car_toOwner_ID) 
-- VALUES ("Fiat","Panda",2015,1),
-- ("Mercedes","Benz",2010,2),
-- ("VW","Beatle",1999,3),
-- ("Mitsubishi","Lancer",2006,4),
-- ("Chevrolet","Aveo",2015,5),
-- ("Renault","Clio",2010,6),
-- ("Opel","Corsa",1999,7),
-- ("Nisan","Qashqai",2006,8),
-- ("Peugeot","208",2001,9),
-- ("Skoda","Octavija",2001,10),
-- ("Audi","A3",2006,11),
-- ("Peugeot","206",1995,12),
-- ("Nisan","Qashqai",2006,3),
-- ("Peugeot","208",2001,7),
-- ("Skoda","Octavija",2001,5),
-- ("Audi","A3",2006,11),
-- ("Peugeot","206",1995,1),
-- ("Toyota","Yaris",2002,13);
-- 
-- DELETE FROM car WHERE Car_ID >18;
-- 
-- 
-- CREATE TABLE IF NOT EXISTS service_sheet(
-- Service_S_ID INT AUTO_INCREMENT PRIMARY KEY,
-- Service_S_Num INT,
-- Date_Time DATETIME NOT NULL,
-- Cost INT NOT NULL,
-- Service_toCar_ID INT NOT NULL,
-- FOREIGN KEY (Service_toCar_ID) REFERENCES car(Car_ID)
-- );
-- 
-- INSERT INTO service_sheet (Service_S_Num,Date_Time,Cost,Service_toCar_ID) 
-- VALUES (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,1),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,2),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,3),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,4),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,5),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,6),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,7),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,8),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,9),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,10),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,11),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,12),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,13),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,14),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,15),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,16),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,17),
-- (FLOOR(RAND()*(20000-10000+1))+10000, NOW() ,FLOOR(RAND()*(2000-1000+1))+1000 ,18);
-- 
-- DELETE FROM service_sheet WHERE Service_S_ID >18;
-- 
-- CREATE TABLE IF NOT EXISTS intervention(
-- Inter_ID INT AUTO_INCREMENT PRIMARY KEY,
-- Inter_Type VARCHAR(255) NOT NULL,
-- Inter_Hours INT NOT NULL,
-- Inter_toServiceS_ID INT NOT NULL,
-- FOREIGN KEY (Inter_toServiceS_ID) REFERENCES service_sheet(Service_S_ID)
-- );
-- 
-- INSERT INTO intervention (Inter_Type,Inter_Hours,Inter_toServiceS_ID)
-- VALUES("mechanic",FLOOR(RAND()*(8-1+1))+1,1),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,2),
-- ("electric",FLOOR(RAND()*(8-1+1))+1,3),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,4),
-- ("bodywork",FLOOR(RAND()*(8-1+1))+1,5),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,6),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,7),
-- ("electric",FLOOR(RAND()*(8-1+1))+1,8),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,9),
-- ("bodywork",FLOOR(RAND()*(8-1+1))+1,10),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,11),
-- ("electric",FLOOR(RAND()*(8-1+1))+1,12),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,13),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,14),
-- ("electric",FLOOR(RAND()*(8-1+1))+1,15),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,16),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,17),
-- ("bodywork",FLOOR(RAND()*(8-1+1))+1,18),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,11),
-- ("electric",FLOOR(RAND()*(8-1+1))+1,5),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,12),
-- ("bodywork",FLOOR(RAND()*(8-1+1))+1,7),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,14),
-- ("electric",FLOOR(RAND()*(8-1+1))+1,6),
-- ("mechanic",FLOOR(RAND()*(8-1+1))+1,1);

ALTER TABLE intervention ADD COLUMN description VARCHAR(255) NOT NULL DEFAULT "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
-- ALTER TABLE service_sheet ADD COLUMN assessment_fee INT NOT NULL DEFAULT 300;


-- CREATE TABLE IF NOT EXISTS mechanic (
-- Mech_ID INT AUTO_INCREMENT PRIMARY KEY,
-- Mech_Name VARCHAR(255) NOT NULL,
-- Mech_Type VARCHAR(255) NOT NULL,
-- Mech_toCar_ID INT,
-- Mech_toInter_ID INT,
-- FOREIGN KEY (Mech_toInter_ID) REFERENCES intervention(Inter_ID),
-- FOREIGN KEY (Mech_toCar_ID) REFERENCES car(Car_ID)
-- );
-- 
-- INSERT INTO mechanic (Mech_Name,Mech_Type,Mech_toCar_ID,Mech_toInter_ID)
-- VALUES ("Haruto","mechanic",13,13),
-- ("Sota","mechanic",14,14),
-- ("Yuto","bodywork",15,15),
-- ("Haruki","mechanic",16,16),
-- ("Riku","electric",17,17),
-- ("Sakura","mechanic",18,18);
-- 
-- DELETE FROM mechanic WHERE Mech_ID >12;
-- 
-- 
-- CREATE TABLE IF NOT EXISTS parts(
-- Part_ID INT AUTO_INCREMENT PRIMARY KEY,
-- Part_SerialNo INT NOT NULL,
-- Part_Type VARCHAR(255) NOT NULL,
-- Part_toCar_ID INT,
-- Part_toInter_ID INT,
-- FOREIGN KEY (Part_toInter_ID) REFERENCES intervention(Inter_ID),
-- FOREIGN KEY (Part_toCar_ID) REFERENCES car(Car_ID)
-- );
-- 
-- INSERT INTO parts(Part_SerialNo,Part_Type,Part_toInter_ID,Part_toCar_ID)
-- VALUES (FLOOR(RAND()*(800-100+1))+100,"mechanic",FLOOR(RAND()*(25-1+1))+1,FLOOR(RAND()*(18-1+1))+1),
-- (FLOOR(RAND()*(800-100+1))+100,"mechanic",FLOOR(RAND()*(25-1+1))+1,FLOOR(RAND()*(18-1+1))+1),
-- (FLOOR(RAND()*(800-100+1))+100,"mechanic",FLOOR(RAND()*(25-1+1))+1,FLOOR(RAND()*(18-1+1))+1),
-- (FLOOR(RAND()*(800-100+1))+100,"bodywork",FLOOR(RAND()*(25-1+1))+1,FLOOR(RAND()*(18-1+1))+1),
-- (FLOOR(RAND()*(800-100+1))+100,"mechanic",FLOOR(RAND()*(25-1+1))+1,FLOOR(RAND()*(18-1+1))+1),
-- (FLOOR(RAND()*(800-100+1))+100,"electric",FLOOR(RAND()*(25-1+1))+1,FLOOR(RAND()*(18-1+1))+1),
-- (FLOOR(RAND()*(800-100+1))+100,"mechanic",FLOOR(RAND()*(25-1+1))+1,FLOOR(RAND()*(18-1+1))+1),
-- (FLOOR(RAND()*(800-100+1))+100,"electric",FLOOR(RAND()*(25-1+1))+1,FLOOR(RAND()*(18-1+1))+1);
-- UPDATE parts SET Part_toInter_ID = 1 WHERE Part_ID=2;

SELECT * FROM operator;
SELECT * FROM car;
SELECT * FROM service_sheet;
SELECT * FROM owner;
SELECT * FROM intervention;
SELECT * FROM mechanic;
SELECT * FROM parts;

-- UPDATE owner,car,service_sheet,intervention,mechanic,parts
-- SET owner.Owner_delete=1 ,car.Car_delete = 1, service_sheet.Service_S_delete = 1 , intervention.Inter_delete = 1 , mechanic.Mech_delete = 1, parts.Part_delete = 1
-- WHERE owner.Owner_ID = 1
-- AND car.Car_toOwner_ID=owner.Owner_ID
-- AND car.Car_ID=service_sheet.Service_toCar_ID
-- AND service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID
-- AND intervention.Inter_ID=mechanic.Mech_toInter_ID
-- AND intervention.Inter_ID=parts.Part_toInter_ID;


delete from owner where Owner_ID = 20;

SELECT * FROM car WHERE Car_toOwner_ID = 1;
SELECT * FROM owner INNER JOIN car ON owner.Owner_ID=car.Car_toOwner_ID;

SELECT * FROM intervention INNER JOIN parts ON intervention.Inter_Type=parts.Part_Type;

SELECT * FROM owner INNER JOIN car ON owner.Owner_ID=car.Car_toOwner_ID
INNER JOIN service_sheet ON car.Car_ID=service_sheet.Service_toCar_ID
INNER JOIN intervention ON service_sheet.Service_S_ID=intervention.Inter_toServiceS_ID
INNER JOIN mechanic ON intervention.Inter_ID=mechanic.Mech_toInter_ID
INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID;

SELECT * FROM intervention INNER JOIN parts ON intervention.Inter_ID=parts.Part_toInter_ID WHERE intervention.Inter_ID=1;

-- UPDATE service_sheet SET Date_Time = NOW(), Cost = 1254 WHERE Service_S_ID=5;
-- UPDATE intervention SET Inter_Type="electric",Inter_Hours = 12 WHERE Inter_toServiceS_ID=5;
-- 
UPDATE mechanic SET Mech_toInter_ID=17 WHERE Mech_ID = 8;