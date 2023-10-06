
const sql = require('../config/db.js');
const logger = require("../logger.js");
const ContoCorrente = require('./contoCorrente.js');
//const ContoCorrenteAttivoJunior = require("./contoCorrenteAttivoJunior.js");
const ContoCorrentePassivoSenior = require('./contoCorrentePassivoSenior.js');

class ContoCorrenteAttivoSenior extends ContoCorrente{

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
    data.saldo=data.saldo.replace(/\./g,'').replace(',', '.');

    const cc = {
        idUtente : data.idUtente,
        iban : data.iban,
        saldo : data.saldo,
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
  bonifico(importo){
    this.prelievo(importo);
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
            this.renew(new ContoCorrentePassivoSenior(this.idContoCorrente));
            logger.info("Il cliente "+await this.getUsername()+" senior il suo conto corrente "+this.idContoCorrente+" si è evoluto da conto corrente attivo a conto corrente passivo");
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
  ricaricaTelefonica(importo){
    this.prelievo(importo);
  }

  acquistoCartaCredito(importo){

  }

  async prestito(importo){
    return await this.versamento(importo);
  }
}

module.exports = ContoCorrenteAttivoSenior;