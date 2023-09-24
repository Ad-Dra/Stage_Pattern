

const sql = require('../config/db.js');

class TipologiaBonifico {

    constructor(){

    }

    /**
     * Il seguente metodo ritorna le tipologie di bonifico
     * 
     * @returns le tipologie bonifico
     */
    getTipologie(){
        return new Promise(resolve =>{
            sql.query("SELECT idTipoMovimento, nome, descrizione FROM TipoMovimento WHERE nome LIKE '%bonifico%';",(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve(res);
            })  
        }); 
    }
}

module.exports = TipologiaBonifico;