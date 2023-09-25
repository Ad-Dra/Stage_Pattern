
const ContoCorrenteAttivoSenior = require("../classiBase/ContoCorrenteAttivoSenior.js");
const Cliente = require("../classiBase/cliente.js");
const ContoCorrente = require("../classiBase/contoCorrente.js");
const ContoCorrenteAttivoJunior = require("../classiBase/contoCorrenteAttivoJunior.js");
const Utility = require("../controllers/utility.controller.js");
const clienti = require('../models/utente.model.js');

/**
 * Si occupa della creazione del conto corrente dell'utente
 * 
 * @param {*} req parametri richiesti
 * @param {*} res valore che viene ritornato 
 */
exports.creaContoCorrente=async (req,res)=>{

    if(!req.body)
        res.status(400).send({
            message: "Il contenuto non può essere vuoto!"
        });
    
    req.body.idOperatoreInserimento=await Utility.getIdUtente(req);

    let risp=await Utility.isActiveUser({identificativo:req.body.email},null);
    
    if(risp.status==200){
        let datiUtente=await Utility.getDatiUtente(req.body.email);

        datiUtente=JSON.parse(JSON.stringify(datiUtente))[0];

        let risp;
        let cliente=await clienti.getClienti()[datiUtente.idUtente];

        if(datiUtente.idRuolo==2){
            risp=await ContoCorrenteAttivoJunior.create(req.body);
        }else
            risp= await ContoCorrenteAttivoSenior.create(req.body);
        
        //Per aggiornare l'array
        if(cliente!=null)
            await cliente.getContiCorrenti();

        res.send(risp);
    }
    else
      res.status(401).send({message:"Il cliente non ha l'utenza attiva"});
}

/**
 * Il seguente metodo si occupa di cancellare un determinato conto corrente
 * 
 * @param {*} req parametri richiesti: idContoCorrente
 * @param {*} res msg be
 */
exports.deleteContoCorrente = async (req, res) => {
    if (!req.body.idContoCorrente) 
        res.status(400).send({
            message: "Il contenuto non può essere vuoto!"
        });
    
    let risp=await ContoCorrente.deleteByIdDoc(req.body.idContoCorrente)

    if(risp && risp.message){
        let cliente=await clienti.getClienti()[req.body.idUtente];

        if(cliente!=null)
            cliente.contiCorrenti.splice(req.body.idContoCorrente,1);
    }

    res.send(risp);
}

/**
 * Il seguente metodo si occupa di individuare i conti correnti di un determinato cliente
 * 
 * @param {*} req parametri richiesti
 * @param {*} res conti correnti di un determinato cliente
 */
exports.getDettagliContoCorrente=async (req,res)=>{

    let idUtente=await Utility.getIdUtente(req);

    let cliente=await clienti.getClienti()[idUtente];

    let contiCorrenti=await cliente.getContiCorrenti();
    
    res.send(contiCorrenti);
}

/**
 * Il seguente metodo si occupa di individuare i conti correnti di un determinato cliente invocato dall'admin
 * 
 * @param {*} req parametri richiesti
 * @param {*} res conti correnti di un determinato cliente
 */
exports.getDettagliContoCorrenteByIdUtente=async (req,res)=>{
    let cliente=new Cliente(req.params.idUtente,null);
    
    res.send(await cliente.getContiCorrenti());
}