const sql = require("../config/db.js");
const Utility = require("../controllers/utility.controller.js");
const passwordConfig = require("../config/password.config.js");
const logger = require("../logger.js");

const ClienteJunior = require("../classiBase/clienteJunior.js");
const ClienteSenior = require("../classiBase/clienteSenior.js");

var clienti=[];

const UtentiAutenticati=function(utenzaLogin){
    this.identificativo=utenzaLogin.identificativo;
    this.password=utenzaLogin.password;
}

/**
 * Verifica se le credenziali inserite sono corrette e se questa operazione ha successo l'utente
 * può navigare nel sito
 * 
 * @param {*} utenzaLogin parametri richiesti
 * @param {*} result stato operazione
 */
UtentiAutenticati.login = (utenzaLogin,result) => {

  	sql.query(`select idRuolo,idUtente,password,username,email,cartaCredito from utente where (email= BINARY ? or username= BINARY ?) and password=aes_encrypt(?, "${passwordConfig.KEY}")`,[utenzaLogin.identificativo,utenzaLogin.identificativo,utenzaLogin.password], async (err, res) => {
		if(err) {
      		console.log("error: ", err);
      		result(err, null);
    	}
		
		res=JSON.parse(JSON.stringify(res))[0];

		if (res==undefined)
			result({ message: 'Username o password errati'});
		else {
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

			if(res.idRuolo==2)
				clienti[res.idUtente]=new ClienteJunior(res.idUtente);
			else if(res.idRuolo==3)
				clienti[res.idUtente]=new ClienteSenior(res.idUtente);

			let anagrafica=await clienti[res.idUtente].getAnagrafica();

			let token = await Utility.createToken({identificativo:utenzaLogin.identificativo,ruolo:desc,cognome:anagrafica.cognome,nome:anagrafica.nome},'3h');

			result(null, {status:'200',token: token});
			//TO DO per i log
			//let contiCorrenti=await clienti[res.idUtente].getContiCorrenti();
		}
	});
}
module.exports={UtentiAutenticati, getClienti: () => clienti};