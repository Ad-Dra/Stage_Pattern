const Stage = require("../stage/Stage");
const sql = require('../config/db.js');

const ContoCorrentePassivoJunior = require("../contoCorrente/contoCorrentePassivoJunior.js");
const ContoCorrentePassivoSenior = require("../contoCorrente/contoCorrentePassivoSenior.js");
const ContoCorrenteAttivoJunior = require("../contoCorrente/contoCorrenteAttivoJunior.js");
const ContoCorrenteAttivoSenior = require("../contoCorrente/contoCorrenteAttivoSenior.js");

class Cliente extends Stage{

    constructor(idUtente,idRuolo){
        super();
        
        this.idUtente=idUtente;
        this.idRuolo=idRuolo;

        this.anagrafica=null;
        this.contiCorrenti=[];
    }

    /**
     * 
     * @returns id utente
     */
    getIdUtente(){
        return this.idUtente;
    }

    /**
     * Il seguente metodo si occupa di ritornare l'anagrafica del cliente
     * 
     * @returns l'anagrafica     
     **/
    getAnagrafica(){
        return new Promise(resolve =>{
            sql.query("SELECT username,email,cognome,nome,dataNascita,via,numCivico,cap,provincia,comune FROM anagrafica INNER JOIN utente ON utente.idUtente=anagrafica.idUtente WHERE anagrafica.idUtente= ?;", this.idUtente,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                this.anagrafica=JSON.parse(JSON.stringify(data))[0];

                resolve(JSON.parse(JSON.stringify(data))[0]);
            })  
        });
    }

    /**
     * Il seguente metodo individua i conti correnti di un cliente
     * 
     * @returns conti correnti
     */
    async getContiCorrenti(){
        return new Promise(resolve =>{
            sql.query("SELECT idContoCorrente,saldo FROM utente INNER JOIN contocorrente ON utente.idUtente=contocorrente.idUtente WHERE utente.idUtente= ?;", this.idUtente,async (err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                await this.setContiCorrenti(JSON.parse(JSON.stringify(data)));
                
                resolve(this.contiCorrenti);
            })  
        });
    }

    /**
     * Il seguente metodo si occupa di creare istanze di conti correnti in base alla loro tipologia
     * 
     * @param {*} contiCorrenti array di conti correnti
     */
    setContiCorrenti(contiCorrenti){
        for(let i=0;i<contiCorrenti.length;i++){
            if(contiCorrenti[i]){
                if(contiCorrenti[i].saldo>0 && this.idRuolo==2)
                    this.contiCorrenti[contiCorrenti[i].idContoCorrente]=new ContoCorrenteAttivoJunior(contiCorrenti[i].idContoCorrente);
                else if(contiCorrenti[i].saldo>0 && this.idRuolo==3)
                    this.contiCorrenti[contiCorrenti[i].idContoCorrente]=new ContoCorrenteAttivoSenior(contiCorrenti[i].idContoCorrente);
                else if(contiCorrenti[i].saldo<0 && this.idRuolo==2)
                    this.contiCorrenti[contiCorrenti[i].idContoCorrente]=new ContoCorrentePassivoJunior(contiCorrenti[i].idContoCorrente);
                else
                    this.contiCorrenti[contiCorrenti[i].idContoCorrente]=new ContoCorrentePassivoSenior(contiCorrenti[i].idContoCorrente);
            }
        }
    }

    /**
     * Il seguente metodo individua il codice del ruolo del cliente
     * 
     * @param {*} idUtente codice dell'utente 
     * @returns l'idRuolo dell'cliente
     */
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

    /**
     * Il seguente metodo si occupa di individuare il numero di movimenti effettuati da un cliente
     * 
     * @returns Il numero di movimenti di uno specifico cliente
     */
    getNMovimenti(){
        return new Promise(resolve =>{
            sql.query("SELECT COUNT(*) as numMovimenti FROM Movimento WHERE idUtente = ? and (importo<0 or causale='prestito');", this.idUtente,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve(JSON.parse(JSON.stringify(res))[0].numMovimenti);
            })  
        }); 
    }

    /**
     * Il seguente metodo si occupa di aggiornare il ruolo dell'utente nel db
     * 
     * @returns ok
     */
    refreshRuolo(){
        return new Promise(resolve =>{
            sql.query("UPDATE Utente SET idRuolo = ? WHERE idUtente = ?;", [this.idRuolo,this.idUtente],(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve("ok");
            })  
        }); 
    }
}

module.exports = Cliente;