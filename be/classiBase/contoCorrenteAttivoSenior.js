
const sql = require('../config/db.js');
const ContoCorrenteAttivoJunior = require("./contoCorrenteAttivoJunior.js");

class ContoCorrenteAttivoSenior extends ContoCorrenteAttivoJunior{

    constructor(idContoCorrente){
      super(idContoCorrente);
      //this.idContoCorrente=idContoCorrente;
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

    prestito(importo){
       
    }
}


module.exports = ContoCorrenteAttivoSenior;


