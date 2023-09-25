

const sql = require('../config/db.js');

class Anagrafica {

    constructor(idUtente,nome,cognome,dataNascita,via,numCivico,cap,provincia,comune){
        this.idUtente=idUtente;
        this.nome=nome;
        this.cognome=cognome;
        this.dataNascita=dataNascita;
        this.via=via;
        this.numCivico=numCivico;
        this.cap=cap;
        this.provincia=provincia;
        this.comune=comune;
    }

    /**
     * Il seguente metodo memorizza l'anagrafica dell'utente nel db
     * 
     * @returns status operation
     */
    create(){
        return new Promise(resolve =>{
            sql.query("INSERT INTO anagrafica SET ?;", this,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve({ id: res.id, ...this });
            })  
        }); 
    }
    
    /**
     * Il seguente metodo aggiorna l'anagrafica nel db
     * 
     * @returns status operation
     */
    update(){
        return new Promise(resolve =>{
            sql.query("UPDATE anagrafica SET ? WHERE idUtente = ?;", [this,this.idUtente],(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve(res);
            })  
        });
    }

    static delete(idUtente){
        return new Promise(resolve =>{
            sql.query("DELETE FROM anagrafica WHERE idUtente = ?;", idUtente,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve("ok");
            })  
        });
    }
}

module.exports = Anagrafica;