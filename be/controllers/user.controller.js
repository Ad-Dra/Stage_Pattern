const Utility = require("../controllers/utility.controller.js");

const Anagrafica = require("../classiBase/anagrafica.js");





exports.getContiCorrentiForUtente=async (req,res)=>{
    if (!req.params) {
        result.status(400).send({
          message: "Content can not be empty!"
        });
    }
    
    let username = await Utility.getUsername(req);

    User.getInfoContoCorrente(req.params.idUtente,(err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else{ 
            res.send(data);
        }
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

