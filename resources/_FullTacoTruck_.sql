-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 27, 2014 at 08:42 PM
-- Server version: 5.5.34-0ubuntu0.13.04.1
-- PHP Version: 5.4.9-4ubuntu2.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `taco_truck`
--

DROP DATABASE IF EXISTS taco_truck;
CREATE DATABASE IF NOT EXISTS taco_truck;
USE taco_truck;

-- --------------------------------------------------------

--
-- Table structure for table `fixinClass`
--

CREATE TABLE IF NOT EXISTS `fixinClass` (
  `fixin_classId` int(11) NOT NULL AUTO_INCREMENT,
  `class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fixin_classId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `fixinClass`
--

INSERT INTO `fixinClass` (`fixin_classId`, `class`) VALUES
(1, 'type'),
(2, 'tortillas'),
(3, 'rice'),
(4, 'cheese'),
(5, 'beans'),
(6, 'sauces'),
(7, 'vegetables'),
(8, 'extras');

-- --------------------------------------------------------

--
-- Table structure for table `fixins`
--

CREATE TABLE IF NOT EXISTS `fixins` (
  `fixinId` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `price` double(11,2) DEFAULT NULL,
  `fixin_classId` int(11) DEFAULT NULL,
  PRIMARY KEY (`fixinId`),
  KEY `fixin_classId` (`fixin_classId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fixins`
--

INSERT INTO `fixins` (`fixinId`, `name`, `price`, `fixin_classId`) VALUES
(1, 'Steak', 1.00, 1),
(2, 'Chicken', 0.75, 1),
(3, 'Carnitas', 1.00, 1),
(4, 'Veggie', 0.50, 1),
(5, 'Flour', 0.25, 2),
(6, 'Cayenne', 0.35, 2),
(7, 'Wheat', 0.35, 2),
(8, 'Spinach', 0.30, 2),
(9, 'Cilantro Rice', 0.25, 3),
(10, 'Spanish Rice', 0.25, 3),
(11, 'Queso Fresco', 0.50, 4),
(12, 'Cheddar/Jack Mix', 0.35, 4),
(13, 'Monterrey Jack', 0.35, 4),
(14, 'Refried Beans', 0.35, 5),
(15, 'Whole Pinto Beans', 0.25, 5),
(16, 'Black Beans', 0.10, 5),
(17, 'Hot Tomatillo', 0.00, 6),
(18, 'Death', 0.00, 6),
(19, 'Fresh Lime Juice', 0.00, 6),
(20, 'Bad Ass BBQ', 0.00, 6),
(21, 'Mild Tomatillo', 0.00, 6),
(22, 'Ranch', 0.00, 6),
(23, 'No Sauce', 0.00, 6),
(24, 'Habenero', 0.00, 6),
(25, 'Salsa', 0.00, 6),
(26, 'Ancho', 0.00, 6),
(27, 'Tomatillo', 0.00, 6),
(28, 'Herb Vinigrette', 0.00, 6),
(29, 'Poblano Salsa', 0.00, 7),
(30, 'Roasted Garlic', 0.00, 7),
(31, 'Peppers/Onions', 0.00, 7),
(32, 'Red Onion', 0.00, 7),
(33, 'Jalapenos', 0.00, 7),
(34, 'Pico de Gallo', 0.00, 7),
(35, 'White Onion', 0.00, 7),
(36, 'Tomatoes', 0.00, 7),
(37, 'Cilantro', 0.00, 7),
(38, 'Tortilla Strips', 0.00, 7),
(39, 'Lettuce', 0.00, 7),
(40, 'X - Extra Meat/Veggies', 1.00, 8),
(41, 'Sour Cream', 0.75, 8),
(42, 'Guacamole', 0.75, 8),
(43, 'Queso', 0.50, 8),
(44, 'Sliced Avocado', 0.75, 8),
(45, 'Bacon', 0.50, 8);

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `locations` (
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zipcode` int(11) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`name`, `address`, `city`, `state`, `zipcode`) VALUES
('Addison Circle Park', 'Addison Circle', 'Addison', 'TX', 75001),
('Deep Ellum', '2630 Commerce St', 'Dallas', 'TX', 75226),
('Klyde Warren Park', '2012 Woodall Rodgers Fwy', 'Dallas', 'TX', 75201),
('Southern Methodist Unversity', '6425 Boaz Lane', 'Dallas', 'TX', 75205),
('Truck Yard', '5624 Sears St', 'Dallas', 'TX', 75206);


--
-- Table structure for table `orderItem`
--

CREATE TABLE IF NOT EXISTS `orderItem` (
  `orderItemId` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderItemId`),
  KEY `orderId` (`orderId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `orderItem`
--

INSERT INTO `orderItem` (`orderItemId`, `orderId`, `quantity`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 1),
(4, 1, 2),
(5, 2, 2),
(6, 2, 2),
(7, 2, 2),
(8, 2, 3),
(9, 3, 1),
(10, 3, 1),
(11, 3, 1),
(12, 3, 1),
(13, 4, 1),
(14, 4, 1),
(15, 4, 1),
(16, 4, 3),
(17, 5, 2),
(18, 5, 1),
(19, 5, 2),
(20, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `orderItemDetails`
--

CREATE TABLE IF NOT EXISTS `orderItemDetails` (
  `orderItemDetailId` int(11) NOT NULL AUTO_INCREMENT,
  `orderItemId` int(11) DEFAULT NULL,
  `tacoFixinId` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderItemDetailId`),
  KEY `orderItemId` (`orderItemId`),
  KEY `tacoFixinId` (`tacoFixinId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=104 ;

--
-- Dumping data for table `orderItemDetails`
--

INSERT INTO `orderItemDetails` (`orderItemDetailId`, `orderItemId`, `tacoFixinId`) VALUES
(1, 1, 1),
(2, 1, 5),
(3, 1, 16),
(4, 2, 2),
(5, 2, 6),
(6, 2, 9),
(7, 2, 16),
(8, 3, 3),
(9, 3, 7),
(10, 3, 20),
(11, 3, 41),
(12, 4, 4),
(13, 4, 8),
(14, 4, 18),
(15, 5, 4),
(16, 5, 8),
(17, 5, 32),
(18, 5, 11),
(19, 5, 30),
(20, 5, 36),
(21, 5, 14),
(22, 5, 40),
(23, 6, 3),
(24, 6, 7),
(25, 6, 9),
(26, 6, 16),
(27, 6, 18),
(28, 6, 30),
(29, 6, 31),
(30, 6, 40),
(31, 6, 41),
(32, 7, 2),
(33, 7, 6),
(34, 7, 40),
(35, 7, 41),
(36, 7, 42),
(37, 8, 1),
(38, 8, 5),
(39, 8, 9),
(40, 8, 14),
(41, 8, 38),
(42, 9, 1),
(43, 9, 5),
(44, 9, 26),
(45, 9, 33),
(46, 9, 39),
(47, 10, 2),
(48, 10, 5),
(49, 10, 11),
(50, 10, 10),
(51, 10, 14),
(52, 10, 18),
(53, 10, 29),
(54, 10, 30),
(55, 10, 31),
(56, 10, 32),
(57, 11, 3),
(58, 11, 5),
(59, 11, 38),
(60, 11, 30),
(61, 12, 4),
(62, 12, 6),
(63, 12, 9),
(64, 12, 16),
(65, 12, 17),
(66, 12, 44),
(67, 13, 4),
(68, 13, 6),
(69, 13, 16),
(70, 14, 3),
(71, 14, 5),
(72, 14, 10),
(73, 14, 13),
(74, 14, 20),
(75, 14, 30),
(76, 15, 2),
(77, 15, 7),
(78, 15, 25),
(79, 15, 32),
(80, 15, 33),
(81, 16, 1),
(82, 16, 8),
(83, 16, 9),
(84, 16, 21),
(85, 16, 35),
(86, 17, 1),
(87, 17, 8),
(88, 17, 22),
(89, 17, 30),
(90, 17, 31),
(91, 18, 2),
(92, 18, 8),
(93, 19, 3),
(94, 19, 7),
(95, 19, 33),
(96, 20, 4),
(97, 20, 6),
(98, 20, 30),
(99, 20, 31),
(100, 20, 32),
(101, 20, 33),
(102, 20, 39),
(103, 20, 40);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `total` double(11,2) DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `orderDate`, `total`) VALUES
(1, 1, '2014-12-22 05:57:00', 68.15),
(2, 1, '2015-01-14 06:56:00', 28.51),
(3, 2, '2013-12-23 12:50:00', 91.76),
(4, 2, '2013-04-27 08:41:00', 23.46),
(5, 3, '2014-02-13 18:33:00', 9.26),
(6, 3, '2013-10-06 02:07:00', 51.78),
(7, 4, '2014-12-09 01:25:00', 18.32),
(8, 4, '2013-05-11 16:03:00', 21.24),
(9, 5, '2014-09-19 15:17:00', 98.65),
(10, 5, '2014-06-20 09:29:00', 20.10),
(11, 6, '2013-03-25 01:03:00', 22.82),
(12, 6, '2014-01-20 00:59:00', 75.48),
(13, 7, '2014-09-27 12:52:00', 52.44),
(14, 7, '2015-01-08 03:47:00', 60.46),
(15, 8, '2013-10-19 08:53:00', 22.70),
(16, 8, '2014-07-29 10:15:00', 60.60),
(17, 9, '2014-07-09 07:47:00', 70.42),
(18, 9, '2014-02-27 19:49:00', 27.05),
(19, 10, '2014-05-23 16:23:00', 32.90),
(20, 10, '2013-05-22 05:16:00', 44.23),
(21, 1, '2014-07-14 14:44:00', 37.92),
(22, 2, '2013-09-25 12:17:00', 18.76),
(23, 3, '2014-02-21 09:49:00', 34.40),
(24, 4, '2014-05-08 02:34:00', 75.92),
(25, 5, '2014-10-28 19:26:00', 69.64),
(26, 6, '2013-05-22 00:51:00', 13.30),
(27, 7, '2014-02-28 12:10:00', 1.69),
(28, 8, '2014-01-16 14:24:00', 56.42),
(29, 9, '2013-03-21 09:28:00', 15.94);

-- --------------------------------------------------------

--
-- Table structure for table `sauces`
--

CREATE TABLE IF NOT EXISTS `sauces` (
  `sauceId` int(11) NOT NULL DEFAULT '0',
  `heatRating` int(11) DEFAULT NULL,
  PRIMARY KEY (`sauceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sauces`
--

INSERT INTO `sauces` (`sauceId`, `heatRating`) VALUES
(17, 3),
(18, 4),
(19, 1),
(20, 2),
(21, 2),
(22, 1),
(23, 0),
(24, 3),
(25, 2),
(26, 1),
(27, 1),
(28, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `telephoneNumber` varchar(255) NOT NULL,
  `cc_provider` varchar(255) NOT NULL,
  `cc_number` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `f_name`, `l_name`, `email`, `pass`, `telephoneNumber`, `cc_provider`, `cc_number`)
VALUES
  (1, 'Bobby', 'Dickerson', 'BobbyDDickerson@armyspy.com', '$2y$10$awSaAymhABEP92Z4.b/yqOY2zocMp/ge1bR8oZz5aLvLjePQ8vWVa', '310-706-5713', 'Visa', '4581172250956295'),
  (2, 'John', 'Horan', 'JohnMHoran@cuvox.de', '$2y$10$XHPiyMgIa/xNhSfPJUxmlu8eoZxzZakd80x5xMpTTLUlJjhteHrBS', '802-906-9635', 'Visa', '4833554465137429'),
  (3, 'Lula', 'Benjamin', 'LulaTBenjamin@einrot.com', '$2y$10$BZ20.zRBPZp2sZp9NPsMVOvnozzoYNwtylTlav2zy83JL04Q3kbTq', '641-740-3120', 'Visa', '4173199486453080'),
  (4, 'Franklin', 'Hills', 'FranklinIHills@rhyta.com', '$2y$10$AUGGX4YbUXCvMYGpGMKHQ.cWWvdgeFh5/wxFeGaxTFy5mcEooWUGe', '402-647-8591', 'Visa', '4937182773835950'),
  (5, 'Samuel', 'Blevins', 'SamuelCBlevins@cuvox.de', '$2y$10$3KOjWpTi8I2MeSKeyXiIAOR3Di3b28n0X/A5Nje2gJg8wXR6yWzHC', '815-982-3812', 'American Express', '379823789416348'),
  (6, 'William', 'Raymond', 'WilliamRRaymond@cuvox.de', '$2y$10$czyXLrRr/J06.Auv9zhdLOzWNJyALBrfc1RtAmnLQaUyNSdOhX09G', '732-432-0200', 'American Express', '345650978113056'),
  (7, 'Janice', 'Robertson', 'JaniceRRobertson@superrito.com', '$2y$10$/G2Kbpc/XDXYf4.hdIT1JulKlgYswJDDCgVgyW9snHsGNc38oeoyi', '479-214-4112', 'American Express', '375651072455574'),
  (8, 'Lashawn', 'Lambert', 'LashawnTLambert@einrot.com', '$2y$10$kKBf3VStnx09SCwyVs1/1uzAnx/6aEVjQIbXiyaiMCer0xEG8F7Vi', '859-955-0616', 'American Express', '342691124360073'),
  (9, 'Vanessa', 'Seals', 'VanessaGSeals@dayrep.com', '$2y$10$a/dOIFPvNcSSYRtinF/lMOtrQlewHRP3QtC0DhUGEkQRZ0ye.6Nxi', '417-629-4257', 'Mastercard', '5513462587501850'),
  (10, 'Bethany', 'Tong', 'BethanyETong@dayrep.com', '$2y$10$75j8cmP5hBo0h8wyyiY7de1nWDn9BLZL.5lKIfhg44juxyyfgNmi2', '937-260-7087', 'Mastercard', '5345523630534291');


--
-- Constraints for dumped tables
--

--
-- Constraints for table `fixins`
--
ALTER TABLE `fixins`
  ADD CONSTRAINT `fixins_ibfk_1` FOREIGN KEY (`fixin_classId`) REFERENCES `fixinClass` (`fixin_classId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderItem`
--
ALTER TABLE `orderItem`
  ADD CONSTRAINT `orderItem_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderItemDetails`
--
ALTER TABLE `orderItemDetails`
  ADD CONSTRAINT `orderItemDetails_ibfk_1` FOREIGN KEY (`orderItemId`) REFERENCES `orderItem` (`orderItemId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderItemDetails_ibfk_2` FOREIGN KEY (`tacoFixinId`) REFERENCES `fixins` (`fixinId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sauces`
--
ALTER TABLE `sauces`
  ADD CONSTRAINT `sauces_ibfk_1` FOREIGN KEY (`sauceId`) REFERENCES `fixins` (`fixinId`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
