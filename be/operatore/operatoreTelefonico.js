const sql = require('../config/db.js');

class OperatoreTelefonico {

    constructor(idOperatore){
        this.idOperatore=idOperatore;
    }

    /**
     * Il seguente metodo si occupa di individuare gli operatori telefonici presenti     
     *  
     * @returns operatori
     */
    static getOperatoriTelefonici(){
        return new Promise(resolve =>{
            sql.query("SELECT * FROM operatore;",(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve(res);
            })  
        }); 
    }
    
    /**
     * Il seguente metodo individua i prezzi di ricarica di un determinato operatore telefonico
     * 
     * @returns importi di ricarica
     */
    getImporti(){
        return new Promise(resolve =>{
            sql.query("SELECT * FROM importoRicarica WHERE idOperatore = ?;", this.idOperatore,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve(res);
            })  
        });
    }
}

module.exports = OperatoreTelefonico;