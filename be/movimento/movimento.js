const sql = require('../config/db.js');

class Movimento {
    
    /**
     * Questa funzione si occupa di creare un movimento 
     * 
     * @param {*} data dati movimento
     * @returns msg
     */
    static create(data){
      const movimento = {
          idContoCorrente : data.idContoCorrente,
          idUtente : data.idUtente,
          importo : data.importo,
          dataMovimento : new Date(),
          idTipoMovimento : data.tipologiaBonifico,
          causale : data.causale,
          beneficiario : data.beneficiario,
          ibanBeneficiario : data.ibanBeneficiario,
          idOperatore : data.operatore
      }

      return new Promise(resolve =>{
          sql.query("INSERT INTO Movimento SET ?", movimento, (err, data1) => {
            if (err) {
              console.log("error: ", err);
              resolve({message:err.message});
            }

            resolve("ok");
          })  
      });
    }

    /**
     * Questa funzione si occupa di individuare i movimenti di un certo utente
     * 
     * @param {*} idUtente 
     * @returns movimenti del seguente utente
     */
    static getMovimenti(idUtente){
      return new Promise(resolve =>{
          sql.query("SELECT * FROM Movimento WHERE idUtente = ?;", idUtente, (err, data1) => {
            if (err) {
              console.log("error: ", err);
              resolve({message:err.message});
            }

            resolve(data1);
          })  
      });
    }

    static removeAllMovimentiByIdUtente(idUtente){
      return new Promise(resolve =>{
        sql.query("DELETE FROM Movimento WHERE idUtente = ?;", idUtente, (err, res) => {
          if (err) {
            console.log("error: ", err);
            resolve({message:err.message});
          }

          resolve("ok");
        })  
      });
    }

    static removeAllMovimentiByIdCC(idContoCorrente){
      return new Promise(resolve =>{
        sql.query("DELETE FROM Movimento WHERE idContoCorrente = ?;", idContoCorrente, (err, res) => {
          if (err) {
            console.log("error: ", err);
            resolve({message:err.message});
          }

          resolve("ok");
        })  
      });
    }
}

module.exports = Movimento;