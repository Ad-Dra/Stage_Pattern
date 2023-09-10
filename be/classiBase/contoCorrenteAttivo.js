const ContoCorrente = require("./contoCorrente");
const logger = require("../logger.js");
const ContoCorrentePassivo = require("./contoCorrentePassivo");
const sql = require('../config/db.js');


class ContoCorrenteAttivo extends ContoCorrente{

    constructor(idContoCorrente){
        super(idContoCorrente);
    }

    /**
     * Questa funzione si occupa di effettuare un bonifico
     * 
     * @param {*} importo da versare
     * @param {*} iban msg
     */
    bonifico(importo,iban){
        this.prelievo(importo);
    }

    /**
     * Questa funzione si occupa di decrementare il saldo del seguente conto corrente 
     * 
     * @param {*} importo da prelevare
     * @returns msg
     */
    async prelievo(importo){
        let diff=await this.getSaldo()-parseFloat(importo);

        return new Promise(resolve =>{
            sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [diff, this.idContoCorrente],async (err, data1) => {
              if (err) {
                console.log("error: ", err);
                resolve({message:err.message});
              }
              
              if(diff<=0){
                this.renew(ContoCorrentePassivo);
                logger.info(await Utility.getDescriptionForEvolution(await this.getUsername(),2));
              }

              resolve(data1);
            })  
        }); 
    }

    /**
     * Questa funzione si occupa di effettuare una ricarica telefonica
     * 
     * @param {*} importo da versare
     * @param {*} idOperatore 
     */
    ricaricaTelefonica(importo,idOperatore){
        this.prelievo(importo);
    }
}

module.exports = ContoCorrenteAttivo;