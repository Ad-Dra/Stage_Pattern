
const UtenzaLogin = require("../models/utente.model.js");
const Utility = require("./utility.controller.js");

/**
 * Si occupa della login dell'utente
 * 
 * @param {*} req parametri richiesti
 * @param {*} res valore che viene ritornato :
 *                  - se le credenziali sono corrette ritorna 200 
 *                  - se le credenziali errate o inesistenti ritorna 500
 *                  - se l'accesso non è autorizzato ritorna 401
 */
exports.login=async (req,res)=>{
  const utenzaLogin = new UtenzaLogin.UtentiAutenticati(req.body);

  let isExist=await Utility.isExist(req.body,null);

  if(isExist.length>0){
    let risp=await Utility.isActiveUser(req.body,null);
    
    if(risp.status==200){
      UtenzaLogin.UtentiAutenticati.login(utenzaLogin,(err, data) => {
        if (err)
          res.status(500).send({message:err.message});
        else 
          res.send(data);
      });
    }
    else
      res.status(401).send({message:risp.message});
  }
  else{
    res.status(500).send({message:"Utenza inesistente"});
  }
}