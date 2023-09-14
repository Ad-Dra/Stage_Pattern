
const sql = require('../config/db.js');
const ContoCorrenteAttivoJunior = require("./contoCorrenteAttivoJunior.js");

class ContoCorrenteAttivoSenior extends ContoCorrenteAttivoJunior{

    constructor(idContoCorrente){
      super(idContoCorrente);
      //this.idContoCorrente=idContoCorrente;
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
     * Questa funzione si occupa di effettuare una ricarica telefonica
     * 
     * @param {*} importo da versare
     * @param {*} idOperatore 
     */
    ricaricaTelefonica(importo){
        this.prelievo(importo);
    }

    acquistoCartaCredito(importo){

    }
}


module.exports = ContoCorrenteAttivoSenior;


