const sql = require('../config/db.js');
const Utility = require("../controllers/utility.controller.js");
const logger = require("../logger.js");

const ContoCorrente = function ContoCorrente(data) {
    this.idUtente = data.idUtente;
    this.iban = data.iban;
    this.saldo = null;
    this.descrizione = data.descrizione;
    this.idOperatoreInserimento= data.idOperatoreInserimento;
    this.dataCreazione= null;
};

ContoCorrente.crea = (newContoCorrente, result) => {

    newContoCorrente.dataCreazione=new Date();
    newContoCorrente.saldo=0.0;

    sql.query("INSERT INTO contocorrente SET ?", newContoCorrente, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        result(null, { message:"Conto corrente creato con successo"});
    });
};

ContoCorrente.paga = (idContoCorrente, importo,username,result) => {
    ContoCorrente.getSaldo(idContoCorrente, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        let diff=data-parseFloat(importo);
        
        // TODO: check data[0] se è corretto
        sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [parseFloat(diff).toFixed(2), idContoCorrente], async (err, data1) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
        
            /*if(diff<=0)
                logger.info(await Utility.getDescriptionForEvolution(username,2));
            */
            result(null, data1);
        });
    })
}

ContoCorrente.getIdByIBAN = (iban, result) => {
    sql.query("SELECT * FROM ContoCorrente WHERE IBAN = ?", iban, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, JSON.parse(JSON.stringify(data)));
    });
}

ContoCorrente.ricevi = (idContoCorrente, importo,username, result) => {
    ContoCorrente.getSaldo(idContoCorrente, async (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        let sum=data+parseFloat(importo);

        /*if(data<=0 && sum>0)
            logger.info(await Utility.getDescriptionForEvolution(username,1));
        */
        // TODO: check se data[0] è corretto
        sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?", [parseFloat(sum).toFixed(2), idContoCorrente], (err, data1) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, data1);
        });
    });
};

ContoCorrente.getSaldo = (idContoCorrente, result) => {
    sql.query("SELECT saldo FROM ContoCorrente WHERE idContoCorrente = ?;", idContoCorrente, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, JSON.parse(JSON.stringify(data))[0].saldo);
    });
}

ContoCorrente.delete = (idContoCorrente, result) => {
    sql.query("DELETE FROM Movimento WHERE idContoCorrente = ?;", idContoCorrente, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        sql.query("DELETE FROM ContoCorrente WHERE idContoCorrente = ?;", idContoCorrente, (err, data) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, {message:"Cancellazione avvenuta con successo"});
        })
    });
}

module.exports = ContoCorrente;