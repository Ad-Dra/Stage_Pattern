const sql = require("../config/db.js");

const RicaricaTelefonica = function RicaricaTelefonica() {

}

RicaricaTelefonica.getOperatoriTelefonici = async (result) => {

    sql.query(`select * from operatore`, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, data);
    });
}


RicaricaTelefonica.getImporti = async (idOperatore,result) => {

    sql.query(`select * from importoRicarica where idOperatore=${idOperatore}`, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, data);
    });
}

module.exports = RicaricaTelefonica;