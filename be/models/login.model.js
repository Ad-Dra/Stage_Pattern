const sql = require("../config/db.js");
const Utility = require("../controllers/utility.controller.js");
const passwordConfig = require("../config/password.config");
const logger = require("../logger.js");

const UtenzaLogin=function(utenzaLogin){
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
UtenzaLogin.login = (utenzaLogin,result) => {
      
  	sql.query(`select idRuolo,idUtente,password from utente where (email= BINARY "${utenzaLogin.identificativo}" or username= BINARY "${utenzaLogin.identificativo}") and password=aes_encrypt("${utenzaLogin.password}", "${passwordConfig.KEY}")`, async (err, res) => {
		if(err) {
      		console.log("error: ", err);
      		result(err, null);
    	}
		
		res=JSON.parse(JSON.stringify(res))[0];

		if (res==undefined) {
			result({ message: 'Password errata'});
		} else {
			if (res.idRuolo==1)
				desc="Admin";
			else
				desc='User';

			sql.query(`select cognome,nome from anagrafica where idUtente="${res.idUtente}"`, async (err, res1) => {
				if(err) {
						console.log("error: ", err);
						result(err, null);
				}
				
				let token = await Utility.createToken({identificativo:utenzaLogin.identificativo,ruolo:desc,cognome:JSON.parse(JSON.stringify(res1))[0].cognome,nome:JSON.parse(JSON.stringify(res1))[0].nome},'3h');
			
				if(res.idRuolo!=1)
					logger.info(utenzaLogin.identificativo+": si è evoluto in dashboard");

      			result(null, {status:'200',token: token});
			});
		}
	});
}
module.exports=UtenzaLogin;