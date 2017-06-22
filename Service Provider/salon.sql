CREATE DATABASE  IF NOT EXISTS `salon` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `salon`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: salon
-- ------------------------------------------------------
-- Server version	5.7.9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'mark','mark','mark','mark'),(4,'admin','admin','admin','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `gender` varchar(7) NOT NULL,
  `address` varchar(100) NOT NULL,
  `country` varchar(45) NOT NULL,
  `mobile_number` int(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `status` int(10) NOT NULL DEFAULT '0',
  `role_id` int(10) DEFAULT '1',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Mark','jo','mark','mark','M','asjfd','PH',3434,'mark@gmail.com','rtfyghjk',1,NULL),(2,'Kay','Ja','sample','sample','F','kjdsfbdf','KZ',3435,'ads@gmail.com','dfghj',0,NULL),(3,'John','Paul','john','john','M','kdsjhf','AM',43545,'john@gmail.com','dsfg',1,NULL),(5,'Jo','Neil','jo','jo','M','asdfg','MF',343,'m@gmail.com','sfgh',0,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `comments` varchar(300) DEFAULT NULL,
  `rating` int(2) DEFAULT NULL,
  `serv_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `customer_id_idx` (`customer_id`),
  KEY `serv_id_idx` (`serv_id`),
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  CONSTRAINT `serv_id` FOREIGN KEY (`serv_id`) REFERENCES `service_providers` (`serv_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,3,'dsfghjklaaa',2,1,'2017-05-17','00:17:20'),(3,2,'hahaha',4,1,'2017-05-02','07:08:15'),(5,2,'dfghjkhgh',7,2,'2017-05-09','07:20:32');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `s_id` int(11) NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `customer_id` (`c_id`),
  KEY `s_id_idx` (`s_id`),
  CONSTRAINT `c_id` FOREIGN KEY (`c_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  CONSTRAINT `s_id` FOREIGN KEY (`s_id`) REFERENCES `service_providers` (`serv_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (8,1,'2017-05-03','07:18:16','adfghjkhre',1),(34,5,'2017-05-10','07:20:00','kasjdsad',2);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_accounts`
--

DROP TABLE IF EXISTS `request_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_accounts` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `gender` varchar(7) NOT NULL,
  `address` varchar(100) NOT NULL,
  `country` varchar(45) NOT NULL,
  `mobile_number` int(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `status` int(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_accounts`
--

LOCK TABLES `request_accounts` WRITE;
/*!40000 ALTER TABLE `request_accounts` DISABLE KEYS */;
INSERT INTO `request_accounts` VALUES (10,'Jade','jade','jade','jade','F','dfdfgd','YH',3984763,'asd@gmail.com','sdsadsd',1),(67,'Kas','asd','asd','asd','F','ajydsg','OP',3434,'ha@gmail.com','sadsad',1);
/*!40000 ALTER TABLE `request_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_sp`
--

DROP TABLE IF EXISTS `request_sp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_sp` (
  `serv_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `gender` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `mobilenumber` int(12) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `spbio` varchar(100) NOT NULL,
  `serviceOffer` varchar(100) NOT NULL,
  `service_desc` varchar(100) NOT NULL,
  `status` int(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`serv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_sp`
--

LOCK TABLES `request_sp` WRITE;
/*!40000 ALTER TABLE `request_sp` DISABLE KEYS */;
INSERT INTO `request_sp` VALUES (4,'Hann','Hon','haha','haha','F','sadf','KG',7896,'ssd@gmail.com','dsfdf','Hair','asdsdf',1),(7,'Ja','jo','jo','jo','F','ghjs','KJ',7896,'as@gmail.com','fdfdf','Pedicure','fghjkl',1);
/*!40000 ALTER TABLE `request_sp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_providers`
--

DROP TABLE IF EXISTS `service_providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_providers` (
  `serv_id` int(11) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `gender` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `mobilenumber` int(12) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `spbio` varchar(100) NOT NULL,
  `serviceOffer` varchar(100) NOT NULL,
  `service_desc` varchar(100) NOT NULL,
  `status` int(10) NOT NULL DEFAULT '0',
  `role_id` int(10) DEFAULT '2',
  PRIMARY KEY (`serv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_providers`
--

LOCK TABLES `service_providers` WRITE;
/*!40000 ALTER TABLE `service_providers` DISABLE KEYS */;
INSERT INTO `service_providers` VALUES (1,'sp','sam','sam','sam','M','kdsahf','LSA',23423,'maa@gmail.com','ahjsdvbjsd','Makeup','asdsd',1,NULL),(2,'Manny','Pac','manny','manny','M','asd','HJ',323,'j@gmail.com','sdsad','Facial','sdgfgfg',0,NULL),(87,'ahj','asdh','asdh','asdh','M','sadsad','SS',343,'h@gmail.com','asds','Hair','sdefdfd',1,NULL);
/*!40000 ALTER TABLE `service_providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_request`
--

DROP TABLE IF EXISTS `service_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_request` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `serviceOffer` varchar(100) NOT NULL,
  `dateAvail` datetime NOT NULL,
  `servce_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `custom_id_idx` (`custom_id`),
  KEY `servce_id_idx` (`servce_id`),
  KEY `serviceOffer_idx` (`serviceOffer`),
  CONSTRAINT `custom_id` FOREIGN KEY (`custom_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `servce_id` FOREIGN KEY (`servce_id`) REFERENCES `service_providers` (`serv_id`) ON UPDATE CASCADE,
  CONSTRAINT `serviceOffer` FOREIGN KEY (`serviceOffer`) REFERENCES `services` (`service_name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_request`
--

LOCK TABLES `service_request` WRITE;
/*!40000 ALTER TABLE `service_request` DISABLE KEYS */;
INSERT INTO `service_request` VALUES (21,2,'Facial','2017-05-16 09:22:23',2,'2017-05-03 14:38:00','pending'),(32,2,'Manicure','2017-05-24 00:23:24',87,'2017-05-10 11:26:36','pending');
/*!40000 ALTER TABLE `service_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(45) NOT NULL,
  `prices` float DEFAULT NULL,
  `servp_id` int(11) NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `service_name_UNIQUE` (`service_name`),
  KEY `ser_id_idx` (`servp_id`),
  CONSTRAINT `servp_id` FOREIGN KEY (`servp_id`) REFERENCES `service_providers` (`serv_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (5,'Manicure',3434,1),(7,'Facial',43343,2);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `sp_id` int(11) NOT NULL,
  `cust_id` int(11) NOT NULL,
  `serviceDesc` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`trans_id`),
  UNIQUE KEY `serv_id_UNIQUE` (`sp_id`),
  UNIQUE KEY `cust_id_UNIQUE` (`cust_id`),
  KEY `custname_idx` (`cust_id`),
  KEY `serviceAvailed_idx` (`serviceDesc`),
  CONSTRAINT `cust_id` FOREIGN KEY (`cust_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  CONSTRAINT `serviceDesc` FOREIGN KEY (`serviceDesc`) REFERENCES `services` (`service_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sp_id` FOREIGN KEY (`sp_id`) REFERENCES `service_providers` (`serv_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (12,1,2,'Manicure','Accepted','hjsadfsdf','2017-05-16 11:00:00'),(54,87,1,'Facial','Rejected','asdsad','2017-05-18 14:35:00');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-02 14:36:43
