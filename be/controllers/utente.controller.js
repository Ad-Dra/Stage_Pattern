const Utility = require("../controllers/utility.controller.js");
const Utente = require("../utente/utente.js");
const Anagrafica = require("../utente/anagrafica.js");
const UtentiAutenticati = require("../utente/utentiAutenticati.js");
const logger = require("../logger.js");

var utenti = [];
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
      const utenza = new Utente(dati.email,dati.username,dati.passwordUtente);
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

  let risp=await Utente.delete(req.body.idUtente);

  if( UtentiAutenticati.clienti[req.body.idUtente]!=null)
    UtentiAutenticati.clienti.splice(req.body.idUtente,1);

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

  let risultato= await Utility.isExist(null,req.body.email,null);
  let risultatoToken=await Utility.verifyTokenForEmail(req.body.token);


  if(risultato.length>0 && risultatoToken.email!=undefined){
    let risp=await Utente.updateStateUtenza(req.body.email,req.body.utenzaAttiva);

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

  let risultato= await Utility.isExist(null,req.body.email,null);
  let risultatoToken=await Utility.verifyTokenForEmail(req.body.token);


  if(risultato.length>0 && risultatoToken.email!=undefined){
    let risp=await Utente.updatePswUtenza(req.body.email,req.body.passwordUtente);

    if(risp && risp.message)
      result.status(500).send(risp);
    else
      result.send({message:"Password ripristinata con successo"});
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

  let isExist=await Utility.isExist(req.body,null);

  if(isExist.length>0){
    let risp=await Utility.isActiveUser(req.body,null);
    
    if(risp.status==200){
      
      let utente = new Utente(req.body.identificativo,req.body.identificativo,req.body.password);

      risp = await utente.login();

      if(risp.message){

        if(!utenti[req.body.identificativo])
          utenti[req.body.identificativo]={numTentativi:1};
        else if(utenti[req.body.identificativo].numTentativi>=0 && utenti[req.body.identificativo].numTentativi<3)
          utenti[req.body.identificativo].numTentativi=utenti[req.body.identificativo].numTentativi+=1;

         

        console.log(utenti[req.body.identificativo]);

        if(utenti[req.body.identificativo].numTentativi>3){
          if(!utenti[req.body.identificativo].isTriggered){
            res.status(500).send({message:"L'utenza è bloccata per 2 minuti"});
            utenti[req.body.identificativo].isTriggered=true;
            console.log(utenti[req.body.identificativo].isTriggered)
            setTimeout(function(){unlockAccount(req.body.identificativo);},2*60*1000);
          }
          else
            res.status(500).send({message:"Attendere utenza ancora bloccata"});
        }else
          res.status(500).send({message:risp.message});
      }else{
        if(utenti[req.body.identificativo]){
          utenti[req.body.identificativo].numTentativi=0;
          utenti[req.body.identificativo].isTriggered=false;
        }

        let token;

        if(risp.cliente!=null){
          UtentiAutenticati.clienti[risp.cliente.getIdUtente()]=risp.cliente;
          let anagrafica=await  UtentiAutenticati.clienti[risp.cliente.getIdUtente()].getAnagrafica();
          let cc=await  UtentiAutenticati.clienti[risp.cliente.getIdUtente()].getContiCorrenti();
          
          for(let i=0;i<cc.length;i++){
            if(cc[i]!=null)
              cc[i]=await cc[i].getInfo();
          }

          token= await Utility.createToken({cliente:UtentiAutenticati.clienti[risp.cliente.getIdUtente()],identificativo:req.body.identificativo,ruolo:risp.descRuolo,cognome:anagrafica.cognome,nome:anagrafica.nome},'3h')
          res.send({cliente: UtentiAutenticati.clienti[risp.cliente.getIdUtente()],token:token});
        }
        else{
          token= await Utility.createToken({identificativo:req.body.identificativo,ruolo:risp.descRuolo,cognome:"Admin",nome:"Admin"},'3h');
			
          res.send({token:token});
        }
      }
    }
    else
      res.status(401).send({message:risp.message});
  }
  else
    res.status(500).send({message:"Utenza inesistente"});
}

function unlockAccount(identificativo){
  utenti[identificativo].numTentativi=0;
  utenti[identificativo].isTriggered=false;
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

  delete UtentiAutenticati.clienti[idUtente];

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
  let risp=await Utente.getUtenti();

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
  let user= new Utente(datiUtente.email,datiUtente.username,null);

  let ris=await user.getInfoAccount();

  if (ris && ris.message)
    res.status(500).send({message:ris.message});
  else
    res.send(ris);
}

/**
 * Il seguente metodo si occupa di aggiornare le informazioni relative all'account 
 * 
 * @param {*} req parametri richiesti
 * @param {*} res msg be
 */
exports.updateInfoAccount=async (req,res)=>{
  let idUtente=await Utility.getIdUtente(req);

  let risp=await Utente.updateInfoAccount(req.body,idUtente);

  if(UtentiAutenticati.clienti[idUtente])
    await UtentiAutenticati.clienti[idUtente].getAnagrafica();

  if (risp && risp.message)
    res.status(500).send({message:ris.message});
  else
    res.send({message:"Dati utente aggiornati con successo"});
}

exports.refreshUtente=async (req,res)=>{
  let idUtente=await Utility.getIdUtente(req);

  let cc=await  UtentiAutenticati.clienti[idUtente].getContiCorrenti();
          
  for(let i=0;i<cc.length;i++){
    if(cc[i]!=null)
      cc[i]=await cc[i].getInfo();
  }

  res.send(UtentiAutenticati.clienti[idUtente]);
}