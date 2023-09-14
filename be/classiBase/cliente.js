const Stage = require("../stage/Stage");

const ContoCorrentePassivo = require("./contoCorrentePassivo.js");
const ContoCorrenteAttivoJunior = require("./contoCorrenteAttivoJunior.js");
const ContoCorrenteAttivoSenior = require("./ContoCorrenteAttivoSenior.js");

const sql = require('../config/db.js');


class Cliente extends Stage{

    constructor(idUtente,idRuolo){
        super();
        
        this.idUtente=idUtente;
        this.idRuolo=idRuolo;

        this.anagrafica=null;
        this.contiCorrenti=[];
    }

    getAnagrafica(){
        return new Promise(resolve =>{
            sql.query("SELECT cognome,nome,dataNascita,via,numCivico,cap,provincia,comune FROM anagrafica WHERE idUtente= ?;", this.idUtente,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                this.anagrafica=JSON.parse(JSON.stringify(data))[0];

                resolve(JSON.parse(JSON.stringify(data))[0]);
            })  
        });
    }

    getContiCorrenti(){
        return new Promise(resolve =>{
            sql.query("SELECT dataCreazione,descrizione,saldo,idContoCorrente FROM utente INNER JOIN contocorrente ON utente.idUtente=contocorrente.idUtente WHERE utente.idUtente= ?;", this.idUtente,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                this.setContiCorrenti(JSON.parse(JSON.stringify(data)));
                
                resolve(this.contiCorrenti);
            })  
        });
    }

    setContiCorrenti(contiCorrenti){
        for(let i=0;i<contiCorrenti.length;i++){
            if(contiCorrenti[i]){
                if(contiCorrenti[i].saldo>0 && this.idRuolo==2)
                    this.contiCorrenti[contiCorrenti[i].idContoCorrente]=new ContoCorrenteAttivoJunior(contiCorrenti[i].idContoCorrente);
                else if(contiCorrenti[i].saldo>0 && this.idRuolo==3)
                    this.contiCorrenti[contiCorrenti[i].idContoCorrente]=new ContoCorrenteAttivoSenior(contiCorrenti[i].idContoCorrente);
                else
                    this.contiCorrenti[contiCorrenti[i].idContoCorrente]=new ContoCorrentePassivo(contiCorrenti[i].idContoCorrente);
            }
        }
    }

    static getIdRuoloByIdUtente(idUtente){
        return new Promise(resolve =>{
            sql.query("SELECT idRuolo FROM  Utente  WHERE idUtente = ?;", idUtente,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                resolve(JSON.parse(JSON.stringify(data))[0].idRuolo);
            })  
        });
    }
}


module.exports = Cliente;