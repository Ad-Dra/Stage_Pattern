const Utility = require("../controllers/utility.controller.js");
const User = require("../models/user.model.js");
// const Upload=require("../models/upload.model.js");
const Utenza = require("../models/creaUtenza.model.js");
const Anagrafica = require("../models/anagrafica.model.js");

exports.getInfoAccount=async (req,res)=>{

    const utente = new User({
        idUtente: await Utility.getIdUtente(req)
    });

    User.getInfoAccount(utente.idUtente,(err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else{ 
            res.send(data);
        }
    });
}

exports.checkPswUtente=async (req,res)=>{

    const utente = new User({
        idUtente: await Utility.getIdUtente(req),
        passwordUtente:req.body.passwordUtente
    });

    if (!req.body) {
        result.status(400).send({
          message: "Content can not be empty!"
        });
    }

    User.checkPswUser(utente,(err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else{ 
            res.send(data);
        }
    });
}


/**
 * crea una nuova utenza se non è già esistente
 * 
 * @param {*} req parametri richiesti
 * @param {*} res risposta del be
 */
exports.create = async (req,res) => {
    // Validate request
    if (!req.body)
      res.status(400).send({ message: "Content can not be empty!"});

    let risultato=await this.upload(req,res);

    let dati=JSON.parse(req.body.dati);

    let isExist=await Utility.isExist(null,dati.email,dati.username);

    if(isExist.length==0){
        const utenza = new Utenza(dati);

        Utenza.create(utenza,async (err, data) => {
            if (err)
                res.status(500).send({ message: err.message || "Some error occurred while creating the user."});
            else {
                await createAnagrafica(dati,data.insertId);
                let risp=await createResidenza(dati,data.insertId);
                let token = await Utility.createToken({email:utenza.email},'3h');

                let subject='Benvenuto in City Safe Bank';
                let html=`
                        <h1>Benvenuto ${utenza.username},</h1> <br> 
                        <a style="color:blue" href="http://localhost:4200/#/confermaEmail/${utenza.email}/${utenza.username}/${token}">
                        clicca qua per confermare la tua email.</a> <br><br> <b>Attenzione il link è valido per 3 ore.</b>`;
                let rispEmail=await Utility.sendMail(subject,html,utenza.email);
                
                if(rispEmail)
                    risp.message="Controlla la posta per conferma la creazione dell'account";
                    
                res.send(risp);
            }
        });
    }
    else{
      res.status(500).send({message:"Utenza già esistente"});
    }
};

function createAnagrafica(dati,id){
    const anagrafica = new Anagrafica(dati);

    return new Promise(resolve =>{
        Anagrafica.create(id,anagrafica,(err,data)=>{
            if (err)
                res.status(500).send({
                message:err.message || "Some error occurred while creating the user."
                });
            else
              resolve(data);
        })
    });
}

function updateAnagrafica(dati,idUtente){
    const anagrafica = new Anagrafica(dati);

    return new Promise(resolve =>{
        Anagrafica.update(idUtente,anagrafica,(err,data)=>{
            if (err)
                res.status(500).send({
                message:err.message || "Some error occurred while update the user."
                });
            else
              resolve(data);
        })
    });
}

exports.ripristinaPassword=async (req,result)=>{

    let risp=await Utility.isExist(null,req.body.email,null);
   
    if(risp.length>0){
        let risp=await Utility.isActiveUser(null,req.body.email);

        if(risp.status==200){
            let subject='Riempostare password';
            let token = await Utility.createToken({email:req.body.email},'3h');
            let html=`<h1>Gentile ${req.body.email},</h1> <br> <a style="color:blue" href="http://localhost:4200/#/ripristinaPassword/${req.body.email}/${token}">clicca qua per ripristinare la password.</a> <br><br> <b>Attenzione il link è valido per 3 ore.</b>`
            let risposta=await Utility.sendMail(subject,html,req.body.email);
            
            if(risposta)
                result.send({message:"Controlla la posta per conferma la creazione dell'account"});
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
 * per attivare l'utenza/ modificare la password
 * @param {*} req dati richiesti
 * @param {*} result risultato query
 */
exports.update=async (req,result)=>{
    if (!req.body) {
      result.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    User.update(req.body,(err, data) => {
        if (err)
            result.status(err.status).send({message:err.message});
        else
            result.send(data);
    });
}

exports.updateInfoUser= async (req,res)=>{
     
    if (!req.body)
        res.status(400).send({ message: "Content can not be empty!"});
    
    let risultato=await this.upload(req,res);

    let idUtente = await Utility.getIdUtente(req);
   
    let dati=JSON.parse(req.body.dati);

    User.updateUser(dati, idUtente,(err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else{ 
            updateAnagrafica(dati.anagrafica,idUtente);
            updateResidenza(dati.residenza,idUtente);
            data.message = "informazioni utente aggiornate con successo";
            res.send(data);
        }
    });
}

exports.getUtentiTotali=async (req,res)=>{
    User.getUtentiTotali((err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else 
            res.send(data);
    });
}