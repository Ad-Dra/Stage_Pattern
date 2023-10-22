const ContoCorrente = require("../contoCorrente/contoCorrente.js");
const logger = require("../logger.js");
const sql = require('../config/db.js');

class ContoCorrenteAttivoJunior extends ContoCorrente{

  constructor(idContoCorrente){
    super(idContoCorrente);
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
        saldo : parseFloat(data.saldo.replace(/\./g,'').replace(',', '.')),
        dataCreazione : new Date(),
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
   * Questa funzione si occupa di incrementare il saldo del conto corrente del beneficiario
   * 
   * @param {*} importo da versare 
   * @returns msg
  */
  async versamento(importo){
    this.saldo=await this.getSaldo();
    
    let sum=parseFloat(this.saldo)+parseFloat(importo);

    return new Promise(resolve =>{
        sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [parseFloat(sum).toFixed(2), this.idContoCorrente],(err, data) => {
            if (err) {
                console.log("error: ", err);
                resolve({message:err.message});
            }

            resolve("ok");
        })  
    });
  }

  /**
   * Questa funzione si occupa di effettuare un bonifico
   * 
   * @param {*} importo da versare
   * @param {*} iban msg
   */
  async bonifico(importo){
    await this.prelievo(importo);
  }

  /**
   * Questa funzione si occupa di decrementare il saldo del seguente conto corrente 
   * 
   * @param {*} importo da prelevare
   * @returns msg
   */
  async prelievo(importo){
    this.saldo=await this.getSaldo();

    let diff=parseFloat(this.saldo)-parseFloat(importo);

    return new Promise(resolve =>{
        sql.query("UPDATE ContoCorrente SET saldo = ? WHERE idContoCorrente = ?;", [parseFloat(diff).toFixed(2), this.idContoCorrente],async (err, data1) => {
          if (err) {
            console.log("error: ", err);
            resolve({message:err.message});
          }
          
          if(diff<=0){
            this.renew(ContoCorrentePassivo.prototype);
            logger.info("Il cliente "+await this.getUsername()+" junior il suo conto corrente con id "+this.idContoCorrente+" si è evoluto da conto corrente attivo a conto corrente passivo");
          }

          resolve(data1);
        })  
    }); 
  }
}

module.exports = ContoCorrenteAttivoJunior;
const ContoCorrentePassivo = require("../contoCorrente/contoCorrentePassivoJunior.js");