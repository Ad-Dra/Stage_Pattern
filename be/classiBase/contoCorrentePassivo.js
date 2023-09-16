const ContoCorrente = require("./contoCorrente");
const logger = require("../logger.js");
const sql = require('../config/db.js');


const ContoCorrenteAttivoJunior = require("./contoCorrenteAttivoJunior");
const ContoCorrenteAttivoSenior = require("./ContoCorrenteAttivoSenior");

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
                    let idRuolo=await this.findRuoloUtenteByIdContoCorrente();

                    if(idRuolo==2)
                        this.renew(new ContoCorrenteAttivoJunior(this.idContoCorrente));
                    else
                        this.renew(new ContoCorrenteAttivoSenior(this.idContoCorrente));
                }

                resolve("ok");
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
}

module.exports = ContoCorrentePassivo;