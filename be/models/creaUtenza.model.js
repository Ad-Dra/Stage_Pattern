const sql = require("../config/db.js");
const passwordConfig = require("../config/password.config");

// constructor
const Utenza = function(utenza) {
  this.email = utenza.email;
  this.password = utenza.passwordUtente;
  this.username=utenza.username;
};

Utenza.create = (newUtenza,result) => {
  sql.query(`INSERT INTO utente (email, username, password) 
       values ("${newUtenza.email}","${newUtenza.username}",aes_encrypt("${newUtenza.password}","${passwordConfig.KEY}"))`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null,res);
    //console.log("Utenza creata: ", { id: res.id, ...newUtenza });
  }); 
}

module.exports = Utenza;
