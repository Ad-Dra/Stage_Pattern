const sql = require("../config/db.js");

const Movimento = function Movimento(data) {
    this.idContoCorrente = data.idContoCorrente,
    this.idUtente = data.idUtente,
    this.importo = data.importo,
    this.dataMovimento = data.dataMovimento,
    this.idTipoMovimento = data.idTipoMovimento
    this.causale = data.causale,
    this.beneficiario = data.beneficiario,
    this.ibanBeneficiario = data.ibanBeneficiario
}

Movimento.create = (newMovimento, result) => {
    sql.query("INSERT INTO Movimento SET ?", newMovimento, (err, data) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.id, ...newMovimento });
    });
}

module.exports = Movimento;