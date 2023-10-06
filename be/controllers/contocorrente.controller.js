
const ContoCorrenteAttivoSenior = require("../contoCorrente/ContoCorrenteAttivoSenior.js");
const Cliente = require("../cliente/cliente.js");
const ContoCorrente = require("../contoCorrente/contoCorrente.js");
const ContoCorrenteAttivoJunior = require("../contoCorrente/contoCorrenteAttivoJunior.js");
const Utility = require("../controllers/utility.controller.js");
const UtentiAutenticati = require("../utente/utentiAutenticati.js");

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

        if(datiUtente.idRuolo==2){
            risp=await ContoCorrenteAttivoJunior.create(req.body);
        }else
            risp= await ContoCorrenteAttivoSenior.create(req.body);
        
        //Per aggiornare l'array
        if(UtentiAutenticati.clienti[datiUtente.idUtente]!=null)
            await UtentiAutenticati.clienti[datiUtente.idUtente].getContiCorrenti();

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

        if(UtentiAutenticati.clienti[req.body.idUtente]!=null)
            UtentiAutenticati.clienti[req.body.idUtente].contiCorrenti.splice(req.body.idContoCorrente,1);
    }

    res.send(risp);
}

/**
 * Il seguente metodo si occupa di individuare i conti correnti di un determinato cliente invocato dall'admin
 * 
 * @param {*} req parametri richiesti
 * @param {*} res conti correnti di un determinato cliente
 */
exports.getDettagliContoCorrenteByIdUtente=async (req,res)=>{
    let cliente=new Cliente(req.params.idUtente,null);
    
    let cc=await cliente.getContiCorrenti();
    
    let contiCorrenti=[];

    for(let i=0;i<cc.length;i++){
        if(cc[i]!=null)
            contiCorrenti.push(await cc[i].getInfo());
    }

    res.send(contiCorrenti);
}