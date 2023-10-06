const OperatoreTelefonico = require("../operatore/operatoreTelefonico.js");

/**
 * Il seguente metodo ritona gli operatori disponibili
 * 
 * @param {*} req parametri richiesti
 * @param {*} res operatori
 */
exports.getOperatori=async (req,res)=>{

    let operatori=await OperatoreTelefonico.getOperatoriTelefonici();

    if(operatori && operatori.message)
        res.status(500).send({message:operatori.message});
    else
        res.send(operatori);
}

/**
 * Il seguente metodo ritorna gli importi di ricarica per quel determinato operatore
 * 
 * @param {*} req parametri richiesti: idOperatore
 * @param {*} res gli importi delle ricariche telefoniche
 */
exports.getImportiForOperatore=async (req,res)=>{
    let operatore= new OperatoreTelefonico(req.params.idOperatore);
    let importi= await operatore.getImporti();

    if(importi && importi.message)
        res.status(500).send({message:importi.message});
    else
        res.send(importi);
}