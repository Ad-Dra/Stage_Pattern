

const sql = require('../config/db.js');
const passwordConfig = require("../config/password.config.js");
const Anagrafica = require("./anagrafica.js");
const ContoCorrente = require("./contoCorrente.js");

class Utente {

    constructor(email,username,password){
        this.email=email;
        this.username=username;
        this.password=password;
    }

    /**
     * Il seguente metodo memorizza i dati dell'utente nel db
     * 
     * @returns status operation
     */
    create(){
        return new Promise(resolve =>{
            sql.query(`INSERT INTO utente (email,username,password) VALUES (?,?,aes_encrypt(?,"${passwordConfig.KEY}"));`, [this.email,this.username,this.password],(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve(res);
            })  
        }); 
    }

    /**
     * Il seguente metodo si occupa di cancellare l'utente e i relativi movimenti/conti correnti
     * 
     * @returns msg be
     */
    static delete(idUtente){

        return new Promise(async resolve =>{

            let risp = await ContoCorrente.deleteByIdUtente(idUtente);
            
            if(risp){
                risp = await Anagrafica.delete(idUtente);

                if(risp=="ok"){
                    sql.query("DELETE FROM utente WHERE idUtente = ?;", idUtente, (err, data) => {
                        if (err) {
                            console.log("error: ", err);
                            resolve({message:err.message});
                        }
                        resolve({message:"Utente cancellato con successo"})
                    });
                }
            }
        })
    }

    /**
     * Il seguente metodo si occupa di aggiornare lo stato dell'utenza
     * 
     * @param {*} email 
     * @param {*} state 
     * @returns msg be
     */
    static updateStateUtenza(email,state){
        return new Promise(resolve =>{
            sql.query(`UPDATE utente SET utenzaAttiva = ? WHERE email = ?;`, [state,email],(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve({message:"Utenza aggiornata con successo"});
            })  
        }); 
    }

    /**
     * Il seguente metodo si occupa di aggiornare la psw dell'utenza
     * 
     * @param {*} email 
     * @param {*} psw 
     * @returns msg be
     */
    static updatePswUtenza(email,psw){
        return new Promise(resolve =>{
            sql.query(`UPDATE utente SET password = aes_encrypt(?,"${passwordConfig.KEY}") WHERE email = ?;`, [psw,email],(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve({message:"Password ripristinata con successo"});
            })  
        }); 
    }
    
    /**
     * Il seguente metodo si occupa di individuare gli utenti iscritti al nostro sito 
     * 
     * @returns utenti iscritti al nostro sito
     */
    static getUtenti(){
        return new Promise(resolve =>{
            sql.query("SELECT distinct utente.idUtente,username, email, nome,cognome,dataNascita FROM utente JOIN ruolo ON utente.idRuolo >1 JOIN anagrafica ON utente.idUtente = anagrafica.idUtente;",(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve(res);
            })  
        }); 
    }

    /**
     * Il seguente metodo individua i dati di un account
     * 
     * @returns dettagli account
     */
    getInfoAccount(){
        return new Promise(resolve =>{
            sql.query("SELECT username, email,nome, cognome, dataNascita, comune,provincia, cap, via, numCivico FROM utente INNER JOIN anagrafica ON utente.idUtente=anagrafica.idUtente WHERE utente.email = ?;",this.email,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve(res);
            })  
        }); 
    }
}

module.exports = Utente;