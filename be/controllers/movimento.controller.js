const Movimenti = require('../movimento/movimento.js');
const Utility = require("../controllers/utility.controller.js");
const ContoCorrente = require('../contoCorrente/contoCorrente.js');
const ClienteJunior = require("../cliente/clienteJunior.js");
const ClienteSenior = require("../cliente/clienteSenior.js");

const UtentiAutenticati = require("../utente/utentiAutenticati.js");

const Cliente = require('../cliente/cliente.js');

exports.creaBonifico = async (req, res) => {
    if (req.body) {
        req.body.idUtente = await Utility.getIdUtente(req);
        req.body.importo=req.body.importo.replace(/\./g,'').replace(',', '.');

        if(req.body.importo>0){
            
            let cliente=UtentiAutenticati.clienti[req.body.idUtente];
            contoCorrente=await cliente.getContiCorrenti();
            contoCorrente=contoCorrente[req.body.idContoCorrente];
            

            if (parseFloat(await contoCorrente.getSaldo()) >= parseFloat(req.body.importo)) {
              
                await contoCorrente.bonifico(req.body.importo);

                req.body.importo=req.body.importo*(-1);

                Movimenti.create(req.body,req.body.idUtente);

                if(!(cliente instanceof ClienteSenior))
                    await checkEvoluzioneCliente(cliente);

                let idContoCorrenteBen=await ContoCorrente.getIdByIBAN(req.body.ibanBeneficiario);

                if(idContoCorrenteBen){
                    req.body.importo=req.body.importo*(-1);

                    let idUtenteBeneficiario=await ContoCorrente.getIdUtenteByIBAN(req.body.ibanBeneficiario);
                    let contiCorrentiBeneficiario=[];
                    let risp;

                    if(UtentiAutenticati.clienti[idUtenteBeneficiario]){
                        contiCorrentiBeneficiario=await UtentiAutenticati.clienti[idUtenteBeneficiario].getContiCorrenti();
                        risp=await contiCorrentiBeneficiario[idContoCorrenteBen].versamento(req.body.importo);
                        await contiCorrentiBeneficiario[idContoCorrenteBen].getIdContoCorrente();
                    }
                    else{
                        let idRuolo=await Cliente.getIdRuoloByIdUtente(idUtenteBeneficiario);
                        
                        let clienteBeneficiario;

                        if(idRuolo==2)
                            clienteBeneficiario=new ClienteJunior(idUtenteBeneficiario);
                        else if(idRuolo==3)
                            clienteBeneficiario=new ClienteSenior(idUtenteBeneficiario);
                        
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

async function checkEvoluzioneCliente(cliente){
    let numMovimenti=await cliente.getNMovimenti();
    //50 = max movimenti
    if(numMovimenti>=50)
        await cliente.renew();
}

exports.creaRicaricaTelefonica = async (req,res)=>{
    if(req.body){
        req.body.idUtente = await Utility.getIdUtente(req);
        req.body.importo=parseFloat(req.body.importo);

        if(req.body.importo>0){
            let cliente=UtentiAutenticati.clienti[req.body.idUtente];
            let contoCorrente=await cliente.getContiCorrenti();
            contoCorrente=contoCorrente[req.body.idContoCorrente];

            if (parseFloat(await contoCorrente.getSaldo()) >= parseFloat(req.body.importo)) {

                contoCorrente.ricaricaTelefonica(req.body.importo);

                req.body.importo=req.body.importo*(-1);
                req.body.causale="Ricaricato il numero:"+req.body.numeroTelefono;
                req.body.tipologiaBonifico=8;
                req.body.ibanBeneficiario="ITTTTTT";

                // Creo il movimento in uscita
                await Movimenti.create(req.body);

                if(!(cliente instanceof ClienteSenior))
                    await checkEvoluzioneCliente(cliente);

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

    req.body.importo=req.body.importo.replace(/\./g,'').replace(',', '.');

    // Per ora consideriamo 3000 come valore MAX per il prestito
    if(req.body.importo > 0 && req.body.importo <= 3000){
        req.body.idUtente = await Utility.getIdUtente(req);

        contoCorrente=await UtentiAutenticati.clienti[req.body.idUtente].getContiCorrenti();
        contoCorrente=contoCorrente[req.body.idContoCorrente];

        let risp=await contoCorrente.prestito(req.body.importo);

        if(risp){
            req.body.tipologiaBonifico=9;
            req.body.causale="Prestito dalla City Safe Bank";
            req.body.beneficiario="/";

            risp=await Movimenti.create(req.body);

            if(risp=="ok")
                res.status(200).send({message: "Il prestito gli è stato concesso."});
            else
                res.status(500).send(risp);
        }
        else
            res.status(500).send(risp);
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