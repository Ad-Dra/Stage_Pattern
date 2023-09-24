const ContoCorrente = require("./contoCorrente");
const logger = require("../logger.js");
const sql = require('../config/db.js');
const ContoCorrenteAttivoJunior = require("./contoCorrenteAttivoJunior");

class ContoCorrentePassivoJunior extends ContoCorrente{

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

        let sum=parseFloat(this.saldo.replace(/\./g,'').replace(',', '.'))+parseFloat(importo);

        return new Promise(resolve =>{
            sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [parseFloat(sum).toFixed(2), this.idContoCorrente],async (err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                if(sum>0){
                    this.renew(new ContoCorrenteAttivoJunior(this.idContoCorrente));
                    logger.info("Il cliente "+await this.getUsername()+" junior il suo conto corrente "+this.idContoCorrente+" si è evoluto da conto corrente passivo a conto corrente attivo");
                }

                resolve("ok");
            })  
        });
    }
}

module.exports = ContoCorrentePassivoJunior;