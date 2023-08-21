
const ContoCorrente = require("../models/contocorrente.model.js");
const Utility = require("../controllers/utility.controller.js");

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

    const contoCorrente = new ContoCorrente(req.body);

    let risp=await Utility.isActiveUser({identificativo:req.body.email},null);
    
    if(risp.status==200){
        ContoCorrente.crea(contoCorrente,(err, data) => {
            if (err)
                res.status(500).send({message:err.message});
            else 
                res.send(data);
        });
    }
    else
      res.status(401).send({message:"Il cliente non ha l'utenza attiva"});
}

exports.deleteContoCorrente = async (req, res) => {
    if (!req.body.idContoCorrente) {
        res.status(400).send({
            message: "Il contenuto non può essere vuoto!"
        });
    } else {
        ContoCorrente.delete(req.body.idContoCorrente, (err, data) => {
            if (err)
                res.status(500).send({message:err.message});
            else 
                res.send(data);
        })
    }
}