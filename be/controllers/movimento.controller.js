const Movimenti = require('../classiBase/movimento.js');
const Utility = require("../controllers/utility.controller.js");
const logger = require("../logger.js");
const ContoCorrente = require('../classiBase/contoCorrente.js');

const ClienteJunior = require("../classiBase/clienteJunior.js");
const ClienteSenior = require("../classiBase/clienteSenior.js");

const clienti = require('../models/utente.model.js');
const Cliente = require('../classiBase/cliente.js');

exports.creaBonifico = async (req, res) => {
    if (req.body) {
        req.body.idUtente = await Utility.getIdUtente(req);
        req.body.importo=req.body.importo.replace(/\./g,'').replace(',', '.');

        if(req.body.importo>0){
            
            let contoCorrente=await clienti.getClienti()[req.body.idUtente];
            contoCorrente=await contoCorrente.getContiCorrenti();
            contoCorrente=contoCorrente[req.body.idContoCorrente];
            

            if (await contoCorrente.getSaldo() >= req.body.importo) {
              
                contoCorrente.bonifico(req.body.importo);

                req.body.importo=req.body.importo*(-1);

                Movimenti.create(req.body);

                let idContoCorrenteBen=await ContoCorrente.getIdByIBAN(req.body.ibanBeneficiario);

                console.log("idContoCorrente",idContoCorrenteBen);

                if(idContoCorrenteBen){
                    req.body.importo=req.body.importo*(-1);

                    let idUtenteBeneficiario=await ContoCorrente.getIdUtenteByIBAN(req.body.ibanBeneficiario);
                    let contiCorrentiBeneficiario=[];
                    let risp;

                    console.log("entra",await clienti.getClienti()[idUtenteBeneficiario]);

                    if(await clienti.getClienti()[idUtenteBeneficiario]){
                        contiCorrentiBeneficiario=await clienti.getClienti()[idUtenteBeneficiario].getContiCorrenti();
                        risp=contiCorrentiBeneficiario[idContoCorrenteBen].versamento(req.body.importo);
                    }
                    else{

                        console.log("Cliente non loggato");

                        let idRuolo=await Cliente.getIdRuoloByIdUtente(idUtenteBeneficiario);
                        
                        let clienteBeneficiario;

                        if(idRuolo==2)
                            clienteBeneficiario=new ClienteJunior(idUtenteBeneficiario);
                        else if(idRuolo==3){
                            clienteBeneficiario=new ClienteSenior(idUtenteBeneficiario);
                        }
                        
                        contiBen=await clienteBeneficiario.getContiCorrenti();
                        risp=await contiBen[idContoCorrenteBen].versamento(req.body.importo);
                    }

                    if(risp=="ok"){
                        req.body.idUtente=idUtenteBeneficiario;              
                        req.body.idContoCorrente=idContoCorrenteBen;
                        await Movimenti.create(req.body);

                        res.status(200).send({message: "Bonifico andato a buon fine."})
                    }
                }
                else
                    res.status(200).send({message: "Bonifico andato a buon fine."});
            }
            else
                res.status(500).send({message: "Saldo insufficiente"});
        }
        else
            res.status(500).send({ message: "Non si può effettuare un bonifico < di zero!"});
    } else
        res.status(400).send({ message: "Il contenuto non può essere vuoto!"});
}

exports.creaRicaricaTelefonica = async (req,res)=>{
    if(req.body){
        req.body.idUtente = await Utility.getIdUtente(req);
        req.body.importo=parseFloat(req.body.importo);

        if(req.body.importo>0){

            let contoCorrente=await clienti.getClienti()[req.body.idUtente].getContiCorrenti();
            contoCorrente=contoCorrente[req.body.idContoCorrente];

            if (await contoCorrente.getSaldo() >= req.body.importo) {

                contoCorrente.ricaricaTelefonica(req.body.importo);

                req.body.importo=req.body.importo*(-1);
                req.body.causale="Ricaricato il numero:"+req.body.numeroTelefono;
                req.body.tipologiaBonifico=8;
                req.body.ibanBeneficiario="ITTTTTT";

                // Creo il movimento in uscita
                await Movimenti.create(req.body);

                res.status(200).send({message: "Ricarica effettuata con successo."});
            }
            else
                res.status(500).send({message: "Saldo insufficiente"});
        }
        else
            res.status(500).send({ message: "Non si può effettuare una ricarica telefonica < di zero!"});
    } else {
        res.status(400).send({ message: "Il contenuto non può essere vuoto!"})
    }
}

exports.creaPrestito = async (req, res) => {
    let username = await Utility.getUsername(req);
    //logger.info(username+": la dashboard si è evoluta in prestito");
    req.body.importo=req.body.importo.replace(/\./g,'').replace(',', '.');

    // Per ora consideriamo 3000 come valore MAX per il prestito
    if(req.body.importo > 0 && req.body.importo <= 3000){
        req.body.idUtente = await Utility.getIdUtente(req);
        ContoCorrente.ricevi(req.body.idContoCorrente, req.body.importo, username, async (err, data) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            } 

            if(data.saldoPrec<=0 && data.saldoCorr>0)
                logger.info(await Utility.getDescriptionForEvolution(username,1));

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

    let data=await Movimenti.getMovimenti(idUtente);

    res.send(data);
}
