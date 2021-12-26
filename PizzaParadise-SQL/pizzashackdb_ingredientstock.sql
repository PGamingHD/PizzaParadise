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
-- Table structure for table `ingredientstock`
--

DROP TABLE IF EXISTS `ingredientstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredientstock` (
  `access` int NOT NULL DEFAULT '0',
  `cheesestock` bigint NOT NULL DEFAULT '0',
  `saucestock` bigint NOT NULL DEFAULT '0',
  `pineapplestock` bigint NOT NULL DEFAULT '0',
  `hamstock` bigint NOT NULL DEFAULT '0',
  `pepperonistock` bigint NOT NULL DEFAULT '0',
  `yeaststock` bigint NOT NULL DEFAULT '0',
  `saltstock` bigint NOT NULL DEFAULT '0',
  `sugarstock` bigint NOT NULL DEFAULT '0',
  `flourstock` bigint NOT NULL DEFAULT '0',
  `baconstock` bigint NOT NULL DEFAULT '0',
  `garlicstock` bigint NOT NULL DEFAULT '0',
  `chickenstock` bigint NOT NULL DEFAULT '0',
  `pepperstock` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`access`),
  UNIQUE KEY `access_UNIQUE` (`access`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredientstock`
--

LOCK TABLES `ingredientstock` WRITE;
/*!40000 ALTER TABLE `ingredientstock` DISABLE KEYS */;
INSERT INTO `ingredientstock` VALUES (0,1000000000,1000000000,225450,184200,128899,1000000000,1000000000,1000000000,1000000000,140899,195799,131299,177899);
/*!40000 ALTER TABLE `ingredientstock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-26  0:11:33
