const sql = require('../config/db.js');
const Stage = require('../stage/Stage.js');
const Movimento = require("../movimento/movimento.js");
//const EvoluzioniContoCorrente = require('./evoluzioniContoCorrente.js');


class ContoCorrente extends Stage{

    constructor(idContoCorrente){
        super();
        this.idContoCorrente=idContoCorrente;        
    }

    /**
     * Questa funzione si occupa di cancellare un cc con i suoi relativi movimenti
     * 
     * @returns msg
     */
    static deleteByIdDoc(idContoCorrente){
        return new Promise(async resolve =>{

            let risp=await Movimento.removeAllMovimentiByIdCC(idContoCorrente);

            if(risp=="ok"){
                sql.query("DELETE FROM ContoCorrente WHERE idContoCorrente = ?;", idContoCorrente, (err, data) => {
                    if (err) {
                        console.log("error: ", err);
                        resolve(err);
                        return;
                    }
                    resolve({message:"Cancellazione avvenuta con successo"});
                })
            }
            else 
                resolve(risp);
        }); 
    }

    /**
     * 
     * @returns info conto corrente
     */
    getInfo(){
        return new Promise(resolve =>{
            sql.query("SELECT dataCreazione,descrizione,saldo,idContoCorrente,iban FROM contocorrente WHERE idContoCorrente = ?;", this.idContoCorrente,async (err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
    
                resolve(JSON.parse(JSON.stringify(data))[0]);
            })  
        });
    }

    /**
     * Il seguente metodo si occupa di cancellare il conto corrente e i riletavi movimenti
     *  
     * @param {*} idUtente id utente
     * @returns msg
     */
    static deleteByIdUtente(idUtente){
        return new Promise(async resolve =>{

            let risp=await Movimento.removeAllMovimentiByIdUtente(idUtente);

            if(risp=="ok"){
                sql.query("DELETE FROM ContoCorrente WHERE idUtente = ?;", idUtente, (err, data) => {
                    if (err) {
                        console.log("error: ", err);
                        resolve(err);
                        return;
                    }
                    resolve({message:"Cancellazione avvenuta con successo"});
                })
            }
            else 
                resolve(risp);
        }); 
    }

    /**
     * Questa funzione ritorna l'idContoCorrente
     * 
     * @returns idContoCorrente
     */
    getIdContoCorrente(){
        return this.idContoCorrente;
    }

    /**
     * Questa funzione identifica l'username dell'utente al quale appartiene il cc
     * 
     * @returns username dell'utente al quale appartiene il cc
     */
    getUsername(){
        return new Promise(resolve =>{
            sql.query("SELECT username FROM utente INNER JOIN contoCorrente ON utente.idUtente=contoCorrente.idUtente WHERE idContoCorrente = ?;", this.idContoCorrente,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                resolve(JSON.parse(JSON.stringify(res))[0].username);
            })  
        }); 
    }

    /**
     * Questa funzione si occupa di identificare il saldo attuale del seguente conto corrente
     * 
     * @returns il saldo attuale
     */
    getSaldo(){
        return new Promise(resolve =>{
            sql.query("SELECT saldo FROM ContoCorrente WHERE idContoCorrente = ?;", this.idContoCorrente,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                this.saldo=parseFloat(JSON.parse(JSON.stringify(res))[0].saldo).toFixed(2);
                resolve(this.saldo);
            })  
        }); 
    }

    /**
     * Questa funzione si occupa di incrementare il saldo del conto corrente del beneficiario
     * 
     * @param {*} importo da versare 
     * @returns msg
     */
    versamento(importo){
        throw new Error('Versamento non è implementato!');
    }

   /**
    * Questa funzione si occupa di individuare l'id del contoCorrente partendo dal Iban
    * 
    * @param {*} iban contoCorrente beneficiario
    * @returns idContoCorrente beneficiario
    */
    static getIdByIBAN(iban){
        return new Promise(resolve =>{
            sql.query("SELECT idContoCorrente FROM ContoCorrente WHERE iban = ?;", iban,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                let idContoCorrente=null;

                if(JSON.parse(JSON.stringify(data)).length>0)
                    idContoCorrente=JSON.parse(JSON.stringify(data))[0].idContoCorrente

                resolve(idContoCorrente);
            })  
        });
    }

    /**
     * Questo metodo si occupa di individuare l'idUtente partendo dall'iban
     * 
     * @param {*} iban 
     * @returns idUtente 
     */
    static getIdUtenteByIBAN(iban){
        return new Promise(resolve =>{
            sql.query("SELECT utente.idUtente FROM  Utente INNER JOIN contoCorrente ON utente.idUtente=contoCorrente.idUtente WHERE iban = ?;", iban,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                resolve(JSON.parse(JSON.stringify(data))[0].idUtente);
            })  
        });
    }

    /**
     * Il seguente metodo individua l'idRuolo partendo dall'idContoCorrente
     * 
     * @returns idRuolo dell'utente
     */
    findRuoloUtenteByIdContoCorrente(){
        return new Promise(resolve =>{
            sql.query("SELECT idRuolo FROM Utente INNER JOIN ContoCorrente on utente.idUtente=contoCorrente.idUtente WHERE idContoCorrente = ?;", this.idContoCorrente,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                resolve(JSON.parse(JSON.stringify(data))[0].idRuolo);
            })
        }); 
    }

    /*renew(nameObject,value){
        /*if(nameObject=="ContoCorrentePassivoSenior")
            super.renew(new [nameObject](value));*/
       /*else if(this.nameObject=="contoCorrenteAttivoJunior")
            super.renew(new ContoCorrenteAttivoJunior(this.value));
        else if(this.nameObject=="contoCorrentePassivoSenior")
            super.renew(new ContoCorrentePassivoSenior(this.value));
        else if(this.nameObject=="contoCorrenteAttivoSenior")
            super.renew(new ContoCorrenteAttivoSenior(this.value));
    }*/
}

module.exports = ContoCorrente;