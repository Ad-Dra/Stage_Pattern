const sql = require('../config/db.js');
const Stage = require('../stage/Stage.js');

class ContoCorrente extends Stage{

    constructor(idContoCorrente){
        super();
        this.idContoCorrente=idContoCorrente;
    }

    /**
     * Questa funzione si occupa della creazione di un nuovo conto corrente
     * 
     * @param {*} data dati del nuovo cc
     * @returns msg
     */
    static create(data){
        const cc = {
            idUtente : data.idUtente,
            iban : data.iban,
            saldo : 0.0,
            dataCreazione : new Date(data.dataCreazione),
            descrizione : data.descrizione,
            idOperatoreInserimento : data.idOperatoreInserimento
        }

        return new Promise(resolve =>{
            sql.query("INSERT INTO contocorrente SET ?;", cc,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                resolve({message:"Conto corrente creato con successo"});
            })  
        }); 
    }

    /**
     * Questa funzione si occupa di cancellare un cc con i suoi relativi movimenti
     * 
     * @returns msg
     */
    delete(){
        return new Promise(resolve =>{
            sql.query("DELETE FROM Movimento WHERE idContoCorrente = ?;", this.idContoCorrente,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                sql.query("DELETE FROM ContoCorrente WHERE idContoCorrente = ?;", this.idContoCorrente, (err, data) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    resolve({message:"Cancellazione avvenuta con successo"});
                })
               
            })  
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
    async versamento(importo){
        this.saldo=await this.getSaldo();

        let sum=this.saldo+parseFloat(importo);

        return new Promise(resolve =>{
            sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [parseFloat(sum).toFixed(2), idContoCorrente],(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                resolve("ok");
            })  
        });
    }

   /**
    * Questa funzione si occupa di individuare l'id del contoCorrente partendo dal Iban
    * 
    * @param {*} iban contoCorrente beneficiario
    * @returns idContoCorrente beneficiario
    */
   static getIdByIBAN(iban){
        return new Promise(resolve =>{
            sql.query("SELECT idContoCorrente FROM ContoCorrente WHERE IBAN = ?;", iban,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                resolve(JSON.parse(JSON.stringify(data)).idContoCorrente);
            })  
        });
    }
}

module.exports = ContoCorrente;