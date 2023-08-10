const sql = require('../config/db.js')

const ContoCorrente = function ContoCorrente(data) {
    this.idUtente = data.idUtente;
    this.iban = data.iban;
    this.saldo = data.saldo;
    this.descrizione = data.descrizione;
};

ContoCorrente.crea = (newContoCorrente, result) => {
    // TODO:
    sql.query("INSERT INTO ")
};

ContoCorrente.paga = (idContoCorrente, importo, result) => {
    this.getSaldo(idContoCorrente, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // TODO: check data[0] se è corretto
        sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [data[0] - importo, idContoCorrente], (err, data) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
        });
    })
}

ContoCorrente.getIdByIBAN = (iban, result) => {
    sql.query("SELECT idContoCorrente FROM ContoCorrente WHERE IBAN = ?", iban, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

ContoCorrente.ricevi = (idContoCorrente, importo, result) => {
    this.getSaldo(idContoCorrente, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // TODO: check se data[0] è corretto
        sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?", [data[0] + importo, idContoCorrente], (err, data) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
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
        result(null, res);
    });
}

module.exports = ContoCorrente;