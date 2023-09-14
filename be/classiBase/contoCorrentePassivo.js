const ContoCorrente = require("./contoCorrente");
const logger = require("../logger.js");
const sql = require('../config/db.js');


const UtenzaLogin = require("../models/utente.model.js");

class ContoCorrentePassivo extends ContoCorrente{

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
                    let idUtente=await this.findIdUtenteByIdContoCorrente();

                    console.log("id",idUtente);
                    console.log("this",this);
                    let contoCorrente=await UtenzaLogin.getClienti();

                    console.log("contoCorrente",contoCorrente);

                    /*contoCorrente=await contoCorrente[idUtente].getContiCorrenti();

                    console.log("pree",contoCorrente);

                    contoCorrente=contoCorrente[this.idContoCorrente];

                    Object.setPrototypeOf(contoCorrente, new ContoCorrenteAttivoJunior(this.idContoCorrente));

                    console.log("post",contoCorrente);*/
                }
                //TO DO evoluzione in Attivo
                //this.renew()
                resolve("ok");
            })  
        });
    }



    findIdUtenteByIdContoCorrente(){
        return new Promise(resolve =>{
            sql.query("SELECT idUtente FROM contoCorrente WHERE idContoCorrente = ?;", this.idContoCorrente,(err, data) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                resolve(JSON.parse(JSON.stringify(data))[0].idUtente);
            })
        }); 
    }
}

module.exports = ContoCorrentePassivo;