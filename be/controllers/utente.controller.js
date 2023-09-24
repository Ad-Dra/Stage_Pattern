
const UtenzaLogin = require("../models/utente.model.js");
const Utility = require("./utility.controller.js");
const Utenza = require("../classiBase/utenza.js");
const Anagrafica = require("../classiBase/anagrafica.js");
const clienti = require('../models/utente.model.js');


/**
 * crea una nuova utenza se non è già esistente
 * 
 * @param {*} req parametri richiesti
 * @param {*} res risposta del be
 */
exports.create = async (req,res) => {
  if (!req.body)
    res.status(400).send({ message: "Content can not be empty!"});

  let dati=req.body;

  let isExist=await Utility.isExist(null,dati.email,dati.username);

  if(isExist.length==0){
      const utenza = new Utenza(dati.email,dati.username,dati.passwordUtente);
      let ris=await utenza.create();

      if(ris && ris.insertId){
          const anagrafica= new Anagrafica(ris.insertId,dati.nome,dati.cognome,dati.dataNascita,dati.via,dati.numCivico,dati.cap,dati.provincia,dati.comune);
          await anagrafica.create();
          let token = await Utility.createToken({email:utenza.email},'3h');

          let subject='Benvenuto in City Safe Bank';
          let html=`
                  <h1>Benvenuto ${utenza.username},</h1> <br> 
                  <a style="color:blue" href="http://localhost:4200/#/confermaEmail/${utenza.email}/${utenza.username}/${token}">
                  clicca qua per confermare la tua email.</a> <br><br> <b>Attenzione il link è valido per 3 ore.</b>`;
          let rispEmail=await Utility.sendMail(subject,html,utenza.email);
          
          if(rispEmail)
              res.send({message:"Controlla la posta per conferma la creazione dell'account"});
          else
              res.send(rispEmail);
      }
      else
          res.status(500).send({ message: ris.message || "Some error occurred while creating the user."});
  }
  else
    res.status(500).send({message:"Utenza già esistente"});
};

/**
 * Il seguente metodo si occupa di cancellare l'account di un utente
 * 
 * @param {*} req parametri richiesti: idUtente
 * @param {*} res msg be
 */
exports.delete = async (req, res) => {
  if (!req.body) 
    result.status(400).send({
      message: "Content can not be empty!"
    });

  let risp=await Utenza.delete(req.body.idUtente);

  let clientiAutenticati=await clienti.getClienti();
  
  if(clientiAutenticati[req.body.idUtente]!=null)
    clientiAutenticati.splice(req.body.idUtente,1);

  res.send(risp);
}

/**
 * Il seguente metodo si occupa di mandare l'email per il ripristino psw 
 * 
 * @param {*} req parametri richiesti: email 
 * @param {*} result msg be
 */
exports.ripristinaPassword=async (req,result)=>{

  let risp=await Utility.isExist(null,req.body.email);
 
  if(risp.length>0){
      let risp=await Utility.isActiveUser(null,req.body.email);

      if(risp.status==200){
          let subject='Riempostare password';
          let token = await Utility.createToken({email:req.body.email},'3h');
          let html=`<h1>Gentile ${req.body.email},</h1> <br> <a style="color:blue" href="http://localhost:4200/#/ripristinaPassword/${req.body.email}/${token}">clicca qua per ripristinare la password.</a> <br><br> <b>Attenzione il link è valido per 3 ore.</b>`
          let risposta=await Utility.sendMail(subject,html,req.body.email);
          
          if(risposta)
              result.send({message:"Controlla la posta per ripristinare la password"});
          else
              result.send(risposta);
      }
      else
          result.status(500).send({message:risp.message});
  }
  else
      result.status(500).send({message:"Utenza non trovata"});
}

/**
 * per attivare l'utenza
 * @param {*} req dati richiesti: email e utenzaAttiva
 * @param {*} result msg be
 */
exports.updateStateUtenza=async (req,result)=>{
  if (!req.body) {
    result.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let risultato= await Utility.isExist(null,body.email,null);
  let risultatoToken=await Utility.verifyTokenForEmail(body.token);


  if(risultato.length>0 && risultatoToken.email!=undefined){
    let risp=await Utenza.updateStateUtenza(req.body.email,req.body.utenzaAttiva);

    result.send(risp);
  }
  else{
    if(risultatoToken.email==undefined)
      result({status:403,message:'link scaduto ripetere la procedura per avere un nuovo link'});
    else
      result({status:500,message:"Utenza non trovata"});
  }
}

/**
 * Il seguente metodo aggiorna la psw dell'utenza
 * 
 * @param {*} req dati richiesti: email e psw
 * @param {*} result msg be
 */
exports.updatePswUtenza=async (req,result)=>{
  if (!req.body) {
    result.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let risultato= await Utility.isExist(null,body.email,null);
  let risultatoToken=await Utility.verifyTokenForEmail(body.token);


  if(risultato.length>0 && risultatoToken.email!=undefined){
    let risp=await Utenza.updatePswUtenza(req.body.email,req.body.passwordUtente);

    result.send(risp);
  }
  else{
    if(risultatoToken.email==undefined)
      result({status:403,message:'link scaduto ripetere la procedura per avere un nuovo link'});
    else
      result({status:500,message:"Utenza non trovata"});
  }
}

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
  else
    res.status(500).send({message:"Utenza inesistente"});
}

/**
 * Il seguente metodo effettua la logout dell'utente
 * 
 * @param {*} req parametri richiesti
 * @param {*} result msg be
 */
exports.logout=async (req,result)=>{

  let username=await Utility.getUsername(req);
  let idUtente=await Utility.getIdUtente(req);

  let clientiAutenticati=await clienti.getClienti();

  clientiAutenticati.splice(idUtente,1);

  logger.info("Il cliente "+username+" si è evoluto in utente");

  result.status(200).send({message:"Utente disconnesso con successo"});
}

/**
 * Questa funzione si occupa di individuare gli utenti iscritti al nostro sito
 * 
 * @param {*} req 
 * @param {*} res utenti registrati al nostro sito
 */
exports.getUtentiTotali=async (req,res)=>{
  let risp=await Utenza.getUtenti();

  if (risp && risp.message)
      res.status(500).send({message:risp.message});
  else 
      res.send(risp);
}

/**
 * Il seguente metodo si occupa di ritornare tutte le informazioni relative all'account 
 * 
 * @param {*} req parametri richiesti
 * @param {*} res info account
 */
exports.getInfoAccount=async (req,res)=>{
  let idUtente=await Utility.getIdUtente(req);

  let datiUtente=JSON.parse(JSON.stringify(await Utility.getDatiUtente(idUtente)))[0];
  let user= new Utenza(datiUtente.email,datiUtente.username,null);

  let ris=await user.getInfoAccount();

  if (ris && ris.message)
    res.status(500).send({message:ris.message});
  else
    res.send(ris);
}