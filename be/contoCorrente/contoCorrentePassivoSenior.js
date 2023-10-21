const sql = require('../config/db.js');
const logger = require("../logger.js");
const ContoCorrente = require('./contoCorrente.js');

class ContoCorrentePassivoSenior extends ContoCorrente{

    constructor(idContoCorrente){
        super(idContoCorrente);
    }

    /**
     * Questa funzione si occupa di incrementare il saldo del conto corrente
     * 
     * @param {*} importo da versare 
     * @returns msg
     */
    async versamento(importo){
        this.saldo=await this.getSaldo();

        let sum=parseFloat(this.saldo)+parseFloat(importo);

        return new Promise(resolve =>{
            sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [parseFloat(sum).toFixed(2), this.idContoCorrente],async (err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                if(sum>0){
                    this.renew(new ContoCorrenteAttivoSenior(this.idContoCorrente));
                    logger.info("Il cliente "+await this.getUsername()+" senior il suo conto corrente con id "+this.idContoCorrente+" si è evoluto da conto corrente passivo a conto corrente attivo");
                }

                resolve("ok");
            })  
        });
    }

    async prestito(importo){
        return await this.versamento(importo);
    }
}

module.exports = ContoCorrentePassivoSenior;
const ContoCorrenteAttivoSenior = require('./contoCorrenteAttivoSenior.js');