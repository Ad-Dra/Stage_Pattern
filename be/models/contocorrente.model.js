const sql = require('../config/db.js')

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

ContoCorrente.paga = (idContoCorrente, importo, result) => {
    ContoCorrente.getSaldo(idContoCorrente, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // TODO: check data[0] se è corretto
        sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [data - importo, idContoCorrente], (err, data1) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
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

ContoCorrente.ricevi = (idContoCorrente, importo, result) => {
    ContoCorrente.getSaldo(idContoCorrente, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // TODO: check se data[0] è corretto
        sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?", [data + importo, idContoCorrente], (err, data1) => {
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

module.exports = ContoCorrente;