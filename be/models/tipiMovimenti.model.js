const sql = require("../config/db.js");

const TipiMovimenti = function (data) {
    
};

TipiMovimenti.getBonifico = () => {
    sql.query("SELECT idTipoMovimento, nome, descrizione FROM TipoMovimento WHERE nome LIKE %bonifico%", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null,res);
    });
}

module.exports = TipiMovimenti;