const Movimenti = require('../models/movimento.model');
const Utility = require("../controllers/utility.controller.js");
const logger = require("../logger.js");
const ContoCorrente = require('../models/contocorrente.model');

exports.creaBonifico = async (req, res) => {
    if (req.body) {
        req.body.idUtente = await Utility.getIdUtente(req);
        req.body.importo=req.body.importo.replace(/\./g,'').replace(',', '.');

        if(req.body.importo>0){
            ContoCorrente.getSaldo(req.body.idContoCorrente, async (err, data1) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
    
                if (data1 >= req.body.importo) {
                    let username = await Utility.getUsername(req);
                    // Se il saldo è valido, effettuo il versamento del saldo
                    ContoCorrente.paga(req.body.idContoCorrente, req.body.importo,username, async (err, data) => {
                        if (err) {
                            res.status(500).send({message: err.message})
                            return;
                        }
                        // Creo il movimento in uscita
                        // TODO: Set req.body
                        req.body.importo=req.body.importo*(-1);

                        const mov=new Movimenti(req.body);
                        
                        let username = await Utility.getUsername(req);
                    
                        Movimenti.create(mov, (err, data) => {
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

                                req.body.importo=req.body.importo*(-1);

                                if (data.length > 0) {
                                    ContoCorrente.ricevi(data[0].idContoCorrente,req.body.importo,username, (err, data1) => {
                                        if (err) {
                                            res.status(500).send({ message: err.message });
                                            return;
                                        }
                                        
                                        req.body.idUtente=data[0].idUtente;
                                        
                                        req.body.idContoCorrente=data[0].idContoCorrente;
                                        
                                        const movimentoEntrata=new Movimenti(req.body);
                                       
                                        Movimenti.create(movimentoEntrata, (err, data2) => {
                                            if (err) {
                                                res.status(500).send({ message: err.message });
                                                return;
                                            }
        
                                            res.status(200).send({message: "Bonifico andato a buon fine."})
                                        });
                                    });
                                }
                                else
                                    res.status(200).send({message: "Bonifico andato a buon fine."})
                                
                            });
                        });
                    });
                }
                else
                    res.status(500).send({message: "Saldo insufficiente"})
            });
        }
        else
            res.status(500).send({ message: "Non si può effettuare un bonifico < di zero!"})
    } else {
        res.status(400).send({ message: "Il contenuto non può essere vuoto!"})
    }
}

exports.creaRicaricaTelefonica = async (req,res)=>{
    if(req.body){
        req.body.idUtente = await Utility.getIdUtente(req);
        req.body.importo=parseFloat(req.body.importo);

        if(req.body.importo>0){
            ContoCorrente.getSaldo(req.body.idContoCorrente, async (err, data1) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
    
                if (data1 >= req.body.importo) {
                    let username = await Utility.getUsername(req);
                    // Se il saldo è valido, effettuo il versamento del saldo
                    ContoCorrente.paga(req.body.idContoCorrente, req.body.importo,username,(err, data) => {
                        if (err) {
                            res.status(500).send({message: err.message})
                            return;
                        }
                        // Creo il movimento in uscita
                        // TODO: Set req.body
                        req.body.importo=req.body.importo*(-1);
                        req.body.causale="Ricaricato il numero:"+req.body.numeroTelefono;
                        req.body.tipologiaBonifico=8;
                        req.body.ibanBeneficiario="ITTTTTT"

                        const mov=new Movimenti(req.body);
                       
                        Movimenti.create(mov, (err, data) => {
                            if (err) {
                                res.status(500).send({ message: err.message });
                                return;
                            } 
                            res.status(200).send({message: "Ricarica effettuata con successo."})
                        });
                    });
                }
                else
                    res.status(500).send({message: "Saldo insufficiente"})
            });
        }
        else
            res.status(500).send({ message: "Non si può effettuare un bonifico <= di zero!"})
    } else {
        res.status(400).send({ message: "Il contenuto non può essere vuoto!"})
    }
}

exports.creaPrestito = async (req, res) => {
    let username = await Utility.getUsername(req);
    logger.info(username+": la dashboard si è evoluta in prestito");
    req.body.importo=req.body.importo.replace(/\./g,'').replace(',', '.');
    console.log(req.body.importo)

    // Per ora consideriamo 3000 come valore MAX per il prestito
    if(req.body.importo > 0 && req.body.importo <= 3000){
        req.body.idUtente = await Utility.getIdUtente(req);
        ContoCorrente.ricevi(req.body.idContoCorrente, req.body.importo, username, (err, data) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            } 

            req.body.tipologiaBonifico=9;
            req.body.causale="Prestito dalla City Safe Bank";

            const mov=new Movimenti(req.body);
                       
            Movimenti.create(mov, (err, data) => {
                if (err) {
                    res.status(500).send({ message: err.message });
                    return;
                } 
                res.status(200).send({message: "Il prestito gli è stato concesso."})
            });
        })
    }
    else if(req.body.importo<=0)
        res.status(500).send({ message: "Non si può effettuare un prestito <= di zero!"});
    else
        res.status(500).send({ message: "Non si può effettuare un prestito > di 3000€!"});
}

exports.getMovimentiUtente=async (req,res)=>{

    const idUtente = await Utility.getIdUtente(req);
    let username = await Utility.getUsername(req);

    Movimenti.getMovimenti(username,idUtente,(err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else{ 
            res.send(data);
        }
    });
}
