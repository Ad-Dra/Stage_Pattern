const sql = require("../config/db.js");

const Anagrafica=function(anagrafica){
    this.nome = anagrafica.nome;
    this.cognome = anagrafica.cognome;
    this.dataNascita = anagrafica.dataNascita;
    this.via = anagrafica.via;
    this.numCivico = anagrafica.numCivico;
    this.cap = anagrafica.cap;
    this.provincia = anagrafica.provincia;
    this.comune = anagrafica.comune;
}

Anagrafica.create=(id,anagrafica,result)=>{
    anagrafica.idUtente=id;
   
    sql.query("INSERT INTO anagrafica SET ?", anagrafica, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, { id: res.id, ...anagrafica });
    });
}

Anagrafica.update=(idUtente, anagrafica, result)=>{
  
  sql.query(`update anagrafica set ? where idUtente=${idUtente}`, anagrafica,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}
module.exports = Anagrafica;