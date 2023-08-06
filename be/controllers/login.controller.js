
const UtenzaLogin = require("../models/login.model.js");
//const sql = require("../models/db.js");
const Utility = require("../controllers/utility.controller.js");

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
  const utenzaLogin = new UtenzaLogin(req.body);

  let isExist=await Utility.isExist(req.body,null);

  if(isExist.length>0){
    let risp=await Utility.isActiveUser(req.body,null);
    
    if(risp.status==200){
      let risultato = await checkRuolo(req);

      if(risultato.status != 200) {  
        res.status(risultato.status).send({message:risultato.message});
      } 
      else {
        //stai sulla login di default e vuoi accedere come un admin
        if(risultato.ruolo==1 && req.body.ruolo==undefined)
          res.status(401).send({message:'accesso non autorizzato'});
        else
          UtenzaLogin.login(utenzaLogin,(err, data) => {
            if (err)
              res.status(500).send({message:err.message});
            else 
              res.send(data);
          });
      }
    }
    else
      res.status(401).send({message:risp.message});
  }
  else{
    res.status(500).send({message:"Utenza inesistente"});
  }
}

/**
 * Verifica il ruolo dell'utente
 * 
 * @param {*} req parametri richiesti
 * @returns 200 se l'accesso è autorizzato altrimenti 401
 */
function checkRuolo(req) {
  /*return new Promise(resolve =>{
    sql.query(`select idRuolo from utente where (email= BINARY "${req.body.identificativo}" or username= BINARY "${req.body.identificativo}")`, (err, res) => {
      if(err) {
        console.log("error: ", err);
        resolve(err);
      }
      res=JSON.parse(JSON.stringify(res))[0];

      // se req.body.ruolo è true vuol dire che stiamo nella login dell'admin
      if(res.idRuolo!=1 && req.body.ruolo!=undefined){
        resolve({ message: 'accesso non autorizzato', status:401});
      }
      else
        resolve({status:200,ruolo:res.idRuolo});
  })});*/
}