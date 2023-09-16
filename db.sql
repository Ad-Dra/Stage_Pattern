create database banca;
use banca;

CREATE TABLE `Ruolo` (
  `idRuolo` int NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(45) NOT NULL,
  PRIMARY KEY (`idRuolo`)
);

insert into ruolo (descrizione) values("Admin");
insert into ruolo (descrizione) values("Cliente Junior");
insert into ruolo (descrizione) values("Cliente Senior");

CREATE TABLE `Utente` (
  `idUtente` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varbinary(255) NOT NULL,
   `email` varchar(45) DEFAULT NULL,
  `utenzaAttiva` tinyint NOT NULL DEFAULT '0',
  `idRuolo` int DEFAULT NULL DEFAULT 1,
  `cartaCredito` varchar(45),
  PRIMARY KEY (`idUtente`),
  CONSTRAINT `idRuolo` FOREIGN KEY (`idRuolo`) REFERENCES `Ruolo` (`idRuolo`)
);

insert into Utente (username, password, email, utenzaAttiva, idRuolo) values("admin", AES_ENCRYPT('admin', 'D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeS'), "admin@gmail.com", 1, 1);
insert into Utente (username, password, email, utenzaAttiva, idRuolo) values("thpertic", AES_ENCRYPT('pass', 'D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeS'), "thpertic@gmail.com", 1, 2);
insert into Utente (username, password, email, utenzaAttiva, idRuolo) values("ad.dra", AES_ENCRYPT('pass', 'D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeS'), "ad.dra@gmail.com", 1, 3);

CREATE TABLE `Anagrafica` (
  `idUtente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `cognome` varchar(45) DEFAULT NULL,
  `dataNascita` datetime DEFAULT NULL,
  `via` varchar(45) DEFAULT NULL,
  `numCivico` varchar(45) DEFAULT NULL,
  `cap` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `comune` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUtente`),
  CONSTRAINT `idUtente` FOREIGN KEY (`idUtente`) REFERENCES `Utente` (`idUtente`)
);
insert into anagrafica (idUtente,nome,cognome,dataNascita,via,numCivico,cap,provincia,comune) 
				values(2,"thomas","pertic","2023-03-12","via r sanzio","2","60036","AN","Montecarotto");
insert into anagrafica (idUtente,nome,cognome,dataNascita,via,numCivico,cap,provincia,comune) 
				values(3,"cc","cc","2023-03-12","via agosto","2","60035","AN","Jesi");

CREATE TABLE `ContoCorrente` (
  `idContoCorrente` int NOT NULL AUTO_INCREMENT,
  `idUtente` int NOT NULL,
  `iban` varchar(27) NOT NULL,
  `saldo` double NOT NULL,
  `dataCreazione` datetime DEFAULT NULL,
  `descrizione` varchar(45),
  `idOperatoreInserimento` int NOT NULL,
  PRIMARY KEY (`idContoCorrente`,`idUtente`),
  CONSTRAINT `idUtente_` FOREIGN KEY (`idUtente`) REFERENCES `Utente` (`idUtente`)
);

-- TODO: Data creazione 
insert into contocorrente (idUtente,iban,saldo,descrizione,idOperatoreInserimento) 
			values(2,"IT12A1234512345123456789000",-50.0,"Conto pirincipale",8);
insert into contocorrente (idUtente,iban,saldo,descrizione,idOperatoreInserimento) 
			values(2,"IT12A1234512345123456789999",100.0,"Conto pirincipale",8);
insert into contocorrente (idUtente,iban,saldo,descrizione,idOperatoreInserimento) 
			values(3,"IT12A1234512345123456788888",10.0,"Conto pirincipale",8);

CREATE TABLE `operatore` (
  `idOperatore` int NOT NULL AUTO_INCREMENT,
  `descrizione`  varchar(50) NOT NULL,
  PRIMARY KEY (`idOperatore`)
);

insert into  operatore (descrizione) values("WIND 3");
insert into  operatore (descrizione) values("TIM");
insert into  operatore (descrizione) values("VODAFONE");

CREATE TABLE `importoRicarica` (
  `idImporto` int NOT NULL AUTO_INCREMENT,
  `idOperatore` int NOT NULL,
  `importo` float NOT NULL,
  PRIMARY KEY (`idImporto`,`idOperatore` ),
  CONSTRAINT `idOperatore` FOREIGN KEY (`idOperatore`) REFERENCES `operatore` (`idOperatore`)
);

insert into importoRicarica (idOperatore,importo) values(1,6);
insert into importoRicarica (idOperatore,importo) values(1,11);
insert into importoRicarica (idOperatore,importo) values(1,15);
insert into importoRicarica (idOperatore,importo) values(1,25);
insert into importoRicarica (idOperatore,importo) values(1,50);
insert into importoRicarica (idOperatore,importo) values(1,100);

insert into importoRicarica (idOperatore,importo) values(2,4);
insert into importoRicarica (idOperatore,importo) values(2,6);
insert into importoRicarica (idOperatore,importo) values(2,12);
insert into importoRicarica (idOperatore,importo) values(2,17);
insert into importoRicarica (idOperatore,importo) values(2,22);
insert into importoRicarica (idOperatore,importo) values(2,25);
insert into importoRicarica (idOperatore,importo) values(2,50);

insert into importoRicarica (idOperatore,importo) values(3,6);
insert into importoRicarica (idOperatore,importo) values(3,8);
insert into importoRicarica (idOperatore,importo) values(3,13);
insert into importoRicarica (idOperatore,importo) values(3,30);
insert into importoRicarica (idOperatore,importo) values(3,50);
insert into importoRicarica (idOperatore,importo) values(3,60);

CREATE TABLE `TipoMovimento` (
  `idTipoMovimento` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descrizione` varchar(45) NOT NULL default "",
  PRIMARY KEY (`idTipoMovimento`)
);

insert into  tipoMovimento (nome) values("bonifico ordinario");
insert into  tipoMovimento (nome) values("bonifico SEPA");
insert into  tipoMovimento (nome) values("bonifico istantaneo");
insert into  tipoMovimento (nome) values("bonifico estero");
insert into  tipoMovimento (nome) values("bonifico irrevocabile");
insert into  tipoMovimento (nome) values("bonifico online");
insert into  tipoMovimento (nome) values("bonifico domiciliato");
insert into  tipoMovimento (nome) values("ricarica telefonica");
insert into  tipoMovimento (nome) values("prestito");

CREATE TABLE `Movimento` (
  `idMovimento` int NOT NULL AUTO_INCREMENT,
  `idContoCorrente` int NOT NULL,
  `idUtente` int NOT NULL,
  `importo` double NOT NULL DEFAULT 0.0,
  `dataMovimento` datetime NOT NULL,
  `idTipoMovimento` int NOT NULL,
  `causale` varchar(90) NOT NULL,
  `beneficiario` varchar(50) NOT NULL,
  `ibanBeneficiario` varchar(27) NOT NULL,
  `idOperatore` int,
  PRIMARY KEY (`idMovimento`,`idUtente`,`dataMovimento`),
  CONSTRAINT `idUtente_m` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`idUtente`),
  CONSTRAINT `idContoCorrente` FOREIGN KEY (`idContoCorrente`) REFERENCES `ContoCorrente` (`idContoCorrente`),
  CONSTRAINT `idTipoMovimento` FOREIGN KEY (`idTipoMovimento`) REFERENCES `TipoMovimento` (`idTipoMovimento`),
  CONSTRAINT `idOperatore_movimento` FOREIGN KEY (`idOperatore`) REFERENCES `operatore` (`idOperatore`)
);
-- TODO: INSERT INTO Movimento
