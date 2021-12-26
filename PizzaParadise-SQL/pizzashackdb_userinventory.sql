-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: pizzashackdb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `userinventory`
--

DROP TABLE IF EXISTS `userinventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinventory` (
  `userId` varchar(30) NOT NULL DEFAULT '0',
  `cheese` bigint NOT NULL DEFAULT '5',
  `yeast` bigint NOT NULL DEFAULT '0',
  `salt` bigint NOT NULL DEFAULT '0',
  `sugar` bigint NOT NULL DEFAULT '0',
  `flour` bigint NOT NULL DEFAULT '0',
  `dough` bigint NOT NULL DEFAULT '5',
  `sauce` bigint NOT NULL DEFAULT '5',
  `margheritap` bigint NOT NULL DEFAULT '0',
  `hawaiianp` bigint NOT NULL DEFAULT '0',
  `pepperoni` bigint NOT NULL DEFAULT '0',
  `ham` bigint NOT NULL DEFAULT '0',
  `pineapple` bigint NOT NULL DEFAULT '0',
  `bacon` bigint NOT NULL DEFAULT '0',
  `garlic` bigint NOT NULL DEFAULT '0',
  `chicken` bigint NOT NULL DEFAULT '0',
  `pepper` bigint NOT NULL DEFAULT '0',
  `baconp` bigint NOT NULL DEFAULT '0',
  `chickenp` bigint NOT NULL DEFAULT '0',
  `habanerop` bigint NOT NULL DEFAULT '0',
  `pepperonip` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinventory`
--

LOCK TABLES `userinventory` WRITE;
/*!40000 ALTER TABLE `userinventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `userinventory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-26  0:11:34
