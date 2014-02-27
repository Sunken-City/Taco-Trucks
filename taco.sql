-- Author: Justin Konersmann
-- Date Created: 2/25/2013
-- Mantenance Log:

-- HOW TO IMPORT CSV:
--	will need to go to each LOAD DATA INFILE statement 
--	and change the file path to match where you have 
-- 	the csv files in your directory

DROP DATABASE IF EXISTS taco_truck;
CREATE DATABASE IF NOT EXISTS taco_truck;
USE taco_truck;
CREATE TABLE users
(
userId int AUTO_INCREMENT,
f_name varchar(255) NOT NULL,
l_name varchar(255) NOT NULL,
email varchar(255) NOT NULL,
pass varchar(255) NOT NULL,
telephoneNumber varchar(255) NOT NULL,
cc_provider varchar(255) NOT NULL,
cc_number varchar(255) NOT NULL,
PRIMARY KEY (userId)
);

-- ***************CHANGE THIS FILE PATH****************** 
LOAD DATA INFILE '/home/justin/sites/TacoTruckDBData - Users.csv'
INTO TABLE users
COLUMNS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

CREATE TABLE orders
(
orderId int AUTO_INCREMENT,
userId int,
orderDate DATETIME, 
total DOUBLE PRECISION(11,2),
PRIMARY KEY (orderId),
FOREIGN KEY (userId) REFERENCES users (userId) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ***************CHANGE THIS FILE PATH****************** 
LOAD DATA INFILE '/home/justin/sites/TacoTruckDBData - Orders2.csv'
INTO TABLE orders
COLUMNS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

CREATE TABLE orderItem
(
orderItemId int AUTO_INCREMENT,
orderId int,
quantity int,
PRIMARY KEY (orderItemId),
FOREIGN KEY (orderId) REFERENCES orders (orderId) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ***************CHANGE THIS FILE PATH****************** 
LOAD DATA INFILE '/home/justin/sites/TacoTruckDBData - OrderItem.csv'
INTO TABLE orderItem
COLUMNS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

CREATE TABLE fixin_class
(
fixin_classId int AUTO_INCREMENT,
class varchar(255),
PRIMARY KEY (fixin_classId)
);

CREATE TABLE fixins
(
fixinId int,
name varchar(255),
price DOUBLE PRECISION(11,2),
fixin_classId int,
PRIMARY KEY (fixinId),
FOREIGN KEY (fixin_classId) REFERENCES fixin_class (fixin_classId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE sauces
(
sauceId int,
heatRating int, 
PRIMARY KEY (sauceId),
FOREIGN KEY (sauceId) REFERENCES fixins (fixinId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE orderItemDetails
(
orderItemDetailId int AUTO_INCREMENT,
orderItemId int,
tacoFixinId int,
PRIMARY KEY (orderItemDetailId),
FOREIGN KEY (orderItemId) REFERENCES orderItem (orderItemId) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (tacoFixinId) REFERENCES fixins (fixinId) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ***************CHANGE THIS FILE PATH****************** 
-- LOAD DATA INFILE '/home/justin/sites/TacoTruckDBData - OrderItemDetails.csv'
-- INTO TABLE orderItemDetails
-- COLUMNS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 LINES;

