const Movimenti = require('../classiBase/movimento.js');
const Utility = require("../controllers/utility.controller.js");
const logger = require("../logger.js");
const ContoCorrente = require('../classiBase/contoCorrente.js');
const ContoCorrenteAttivo = require('../classiBase/contoCorrenteAttivo.js');


exports.creaBonifico = async (req, res) => {
    if (req.body) {
        req.body.idUtente = await Utility.getIdUtente(req);
        req.body.importo=req.body.importo.replace(/\./g,'').replace(',', '.');

        if(req.body.importo>0){
            let cc= new ContoCorrente(req.body.idContoCorrente);

            let saldo=await cc.getSaldo();

            if (saldo >= req.body.importo) {
                let ccAttivo=new ContoCorrenteAttivo();

                ccAttivo.bonifico(req.body.importo,req.body.ibanBeneficiario);

                req.body.importo=req.body.importo*(-1);

                Movimenti.create(req.body);

                let idContoCorrenteBen=await ContoCorrente.getIdByIban(req.body.ibanBeneficiario);
                let ccBen;

                if(idContoCorrenteBen){
                    ccBen= await new ContoCorrente(idContoCorrenteBen);
                    req.body.importo=req.body.importo*(-1);
                    let risp=await ccBen.versamento(req.body.importo);

                    if(risp=="ok"){
                        req.body.idUtente=data[0].idUtente;              
                        req.body.idContoCorrente=cc.getIdContoCorrente();
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
            let cc= new ContoCorrente(req.body.idContoCorrente);

            let saldo=await cc.getSaldo();

            if (saldo >= req.body.importo) {
                
                let ccAttivo=new ContoCorrenteAttivo(req.body.idContoCorrente);

                ccAttivo.ricaricaTelefonica(req.body.importo,"ITTTTTT");

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
