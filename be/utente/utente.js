

const sql = require('../config/db.js');
const passwordConfig = require("../config/password.config.js");
const Stage = require('../stage/Stage.js');
const Anagrafica = require("./anagrafica.js");
const ContoCorrente = require("../contoCorrente/contoCorrente.js");
const ClienteSenior = require("../cliente/clienteSenior.js");
const ClienteJunior = require("../cliente/clienteJunior.js");
const logger = require("../logger.js");

class Utente extends Stage{

    constructor(email,username,password){
        super();

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
     * Verifica se le credenziali inserite sono corrette e se questa operazione ha successo l'utente
     * può navigare nel sito
     * 
     * @returns cliente
     */
    login(){
        return new Promise(resolve =>{
            sql.query(`SELECT idRuolo,idUtente,password,username,email,cartaCredito FROM utente WHERE (email= BINARY ? or username= BINARY ?) and password=aes_encrypt(?, "${passwordConfig.KEY}");`, [this.email,this.username,this.password],async (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                res=JSON.parse(JSON.stringify(res))[0];

                if (res==undefined)
                    resolve({ message: 'Username o password errati'});
		        else {

                    let desc;

                    switch(res.idRuolo){
                        case 1:
                            desc="Admin";
                        break;
                        case 2:
                            desc="Cliente Junior";
                        break;
                        case 3:
                            desc="Cliente Senior";
                        break;
                    }

                    let cliente;

                    if(res.idRuolo==2){
                        cliente = new ClienteJunior(res.idUtente);
                        this.renew(cliente);
                    }else if(res.idRuolo==3){
                        cliente = new ClienteSenior(res.idUtente,res.cartaCredito);
                        this.renew(cliente);
                    }

                    if(res.idRuolo>1)
                        logger.info("L'utente "+res.username+" si è evoluto in cliente "+ (res.idRuolo==2 ? "junior" : "senior"));

                    resolve({cliente:cliente,descRuolo:desc});
                }
            });  
        }); 
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
            sql.query(`UPDATE utente SET password = aes_encrypt("${psw}","${passwordConfig.KEY}")
            WHERE email = BINARY "${email}";`,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }
                
                resolve("ok");
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

    static updateInfoAccount(dati,idUtente){
        return new Promise(resolve =>{
            sql.query("UPDATE utente SET ? WHERE idUtente = ?;", [dati.utente,idUtente],async (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({message:err.message});
                }

                let risp=await Anagrafica.update(dati.anagrafica,idUtente);

                resolve(risp);
            })  
        }); 
    }
}

module.exports = Utente;