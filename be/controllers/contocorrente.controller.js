
const ContoCorrente = require("../classiBase/contoCorrente.js");
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

    let risp=await Utility.isActiveUser({identificativo:req.body.email},null);
    
    if(risp.status==200){
        let risp=await ContoCorrente.create(req.body);
        res.send(risp);
    }
    else
      res.status(401).send({message:"Il cliente non ha l'utenza attiva"});
}

exports.deleteContoCorrente = async (req, res) => {
    if (!req.body.idContoCorrente) 
        res.status(400).send({
            message: "Il contenuto non può essere vuoto!"
        });

    let cc= new ContoCorrente(req.body.idContoCorrente);
    let risp=await cc.delete();

    res.send(risp);
}