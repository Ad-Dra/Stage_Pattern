const Cliente = require("./cliente");
const sql = require('../config/db.js');

class ClienteSenior extends Cliente{

    constructor(idUtente,cartaDiCredito){
        super(idUtente,3);
        
        //in caso se non si proviene dalla login ma da un'evoluzione
        if(!cartaDiCredito){
            this.cartaDiCredito=this.generaCartaDiCredito();

            this.createCartaDiCredito();
        }
        else
            this.cartaDiCredito=cartaDiCredito;
    }

    /**
     * Questo metodo si occupa di generare un numero per la carta di credito
     * 
     * @returns il numero della carta di credito
     */
    generaCartaDiCredito(){
        const caratteriValidi="0123456789";
        let risultato="";

        for(let i=0;i<16-(this.idUtente.toString().length);i++)
            risultato += caratteriValidi.charAt(Math.floor(Math.random() * caratteriValidi.length));

        return this.idUtente+risultato;
    }

    /**
     * Questo metodo si occupa di aggiornare i dati della carta di credito nel db
     */
    updateIdCartaDiCredito(){
        return new Promise(resolve =>{
            sql.query("UPDATE Utente SET cartaCredito = ? WHERE idUtente = ?;", [this.cartaDiCredito,this.idUtente],(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve("ok");
            })  
        }); 
    }

    /**
     * Il seguente metodo si occupa di memorizzare nel db la carta di credito e di invocare il metodo
     * che aggiorna la crataCredito sulla tabella utente
     * 
     * @returns 
     */
    createCartaDiCredito(){
        let dataCreazione=new Date();

        return new Promise(resolve =>{
            sql.query("INSERT INTO cartaCredito (idCartaCredito,mese,anno,pin) VALUES (?,?,?,?);", [this.cartaDiCredito,dataCreazione.getMonth()+1,dataCreazione.getFullYear()+5,"1111111"],(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                this.updateIdCartaDiCredito();

                resolve("ok");
            })  
        }); 
    }
}


module.exports = ClienteSenior;