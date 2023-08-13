const Movimenti = require('../models/movimento.model');
const Utility = require("../controllers/utility.controller.js");
const sql = require("../config/db.js");

const ContoCorrente = require('../models/contocorrente.model');

exports.creaBonifico = async (req, res) => {
    if (req.body) {
        req.body.idUtente = await Utility.getIdUtente(req);
        
        if (req.body.saldo > req.body.importo) {
            // Se il saldo è valido, effettuo il versamento del saldo
            ContoCorrente.paga(req.body.idContoCorrente, req.body.importo, (err, data) => {
                if (err) {
                    res.status(500).send({message: err.message})
                    return;
                }
                // Creo il movimento in uscita
                // TODO: Set req.body
                Movimenti.create(req.body, (err, data) => {
                    if (err) {
                        res.status(500).send({ message: err.message });
                        return;
                    } 
                    // Se l'IBAN del beneficiario esiste, aumento il saldo e creo il movimento
                    ContoCorrente.getIdByIBAN(req.body.ibanBeneficiario, (err, data) => {
                        if (err) {
                            res.status(500).send({ message: err.message });
                            return;
                        }
                        if (data.length > 0) {
                            // TODO: check data[0] sia valido
                            ContoCorrente.ricevi(data[0].idContoCorrente, (err, data) => {
                                if (err) {
                                    res.status(500).send({ message: err.message });
                                    return;
                                }
                                Movimenti.create(req.body, (err, data) => {
                                    if (err) {
                                        res.status(500).send({ message: err.message });
                                        return;
                                    }
                                });
                            });
                        } 
                        res.status(200).send({message: "Bonifico andato a buon fine."})
                    });
                });
            });
        }
        else
            res.status(500).send({message: "Saldo insufficiente"})


// TODO: Diminuisco il saldo se 
                // TODO: Creo il movimento in uscita
                // TODO: Verifico che l'IBAN  del beneficiario esista nel nostro DB
                // TODO: Se esiste, aumento il saldo e creo il movimento in entrata


        
    } else {
        res.status(400).send({ message: "Il contenuto non può essere vuoto!"})
    }
}

exports.getMovimentiUtente=async (req,res)=>{

    const idUtente = await Utility.getIdUtente(req);

    Movimenti.getMovimenti(idUtente,(err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else{ 
            res.send(data);
        }
    });
}
