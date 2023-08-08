const sql = require("../config/db.js");
const Utility = require("../controllers/utility.controller.js");
const passwordConfig = require("../config/password.config");
const { query } = require("express");

const InfoUser = function(dati) {
    this.idUtente = dati.idUtente;
    this.passwordUtente=dati.passwordUtente;
    this.passwordNuova=dati.passwordNuova;
};

InfoUser.checkPswUser=(utente,result)=>{
  sql.query(`select password 
              from utente
              where 
                idUtente=${utente.idUtente} and 
                password=aes_encrypt("${utente.passwordUtente}","${passwordConfig.KEY}")`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 

      if(JSON.parse(JSON.stringify(res)).length>0)
        result(null, {status:200});
      else
        result(null, {status:500});
      
  }); 
}

InfoUser.getInfoAccount=(idUtente,result)=>{
  sql.query(`select 
                username, email, 
                nome, cognome, dataNascita, comune,
                provincia, cap, via, numCivico, 
              from utente inner join anagrafica on utente.idUtente=anagrafica.idUtente
              where utente.idUtente=${idUtente}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  }); 
}

InfoUser.updateUser=(dati, idUtente, result)=>{

  if (dati.utente.passwordNuova != null && dati.utente.passwordNuova!='' && dati.utente.passwordNuova!=dati.utente.passwordUtente)
    query=`update utente set username= "${dati.utente.username}" , password= aes_encrypt("${dati.utente.passwordNuova}","${passwordConfig.KEY}") , email= "${dati.utente.email}" where idUtente = ${idUtente}`;
  else if(dati.utente.passwordNuova == null)
    query=`update utente set username= "${dati.utente.username}" , email= "${dati.utente.email}" where idUtente = ${idUtente}`;

  sql.query(query,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
} 

InfoUser.getUtentiTotali = (result) => {

  sql.query(`select idUtente, username, email, descrizione 
            from utente join ruolo on utente.idRuolo = ruolo.idRuolo;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  }); 
}

InfoUser.update=async (body,result)=>{
  var risultato= await Utility.isExist(null,body.email,null);
  var risultatoToken=await Utility.verifyTokenForEmail(body.token);
  let query;

  if(risultato.length>0 && risultatoToken.email!=undefined){
    if(body.flag!=1)
      query=`UPDATE utente set utenzaAttiva="${body.utenzaAttiva}" where email="${body.email}"`;
    else
      query=`UPDATE utente set password=aes_encrypt('${body.passwordUtente}',"${passwordConfig.KEY}") where email="${body.email}"`;
      
    sql.query(query,(err, res) => {
      if (err) {
        console.log("error: ", err);
        err.status=500;
        result(err, null);
      }

      if(body.flag!=1)
        res.message="Utenza aggiornata con successo";
      else
        res.message="Password ripristinata con successo";

      result(null,res);
    }); 
  }
  else{
    if(risultatoToken.email==undefined)
      result({status:403,message:'link scaduto ripetere la procedura per avere un nuovo link'});
    else
      result({status:500,message:"Utenza non trovata"});
  }
}
  
module.exports = InfoUser;



