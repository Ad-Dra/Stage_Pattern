const sql = require("../config/db.js");

const Movimento = function Movimento(data) {
    this.idContoCorrente = data.idContoCorrente,
    this.idUtente = data.idUtente,
    this.importo = data.importo,
    this.dataMovimento = data.dataMovimento,
    this.idTipoMovimento = data.tipologiaBonifico
    this.causale = data.causale,
    this.beneficiario = data.beneficiario,
    this.ibanBeneficiario = data.ibanBeneficiario,
    this.idOperatore = data.operatore
}

Movimento.create = (newMovimento, result) => {
    newMovimento.dataMovimento=new Date();
    
    sql.query("INSERT INTO Movimento SET ?", newMovimento, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, {...newMovimento });
    });
}

Movimento.getMovimenti = async (idUtente, result) => {

    sql.query(`select * from movimento where idUtente="${idUtente}"`, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, data);
    });
}

module.exports = Movimento;