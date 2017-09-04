CREATE TABLE IF NOT EXISTS `editablecontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `updatedText` varchar(5000) NOT NULL,
  `ElementId` varchar(150) NOT NULL,
  `PageURL` varchar(1000) NOT NULL,


  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
