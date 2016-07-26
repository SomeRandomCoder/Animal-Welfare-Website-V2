-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 07, 2016 at 02:59 PM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nelisaDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--
-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--



-- --------------------------------------------------------

--
-- Table structure for table `sales`
--


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `admin`, `locked`) VALUES
(16, 'Nelisa1', '$2a$10$TPsrpIVMs/homeT4GPs.6.7frk66mQSjFbnH/Te4D9RkhJI3rrMFi', 1, 0),
(19, 'Tyron', '$2a$10$Ouj9tU0js7tm.Rdk.qV0qepUZqaTj7h08TlGF2RIwFKC06oDMgmR6', 0, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--


--
-- Constraints for table `sales`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
