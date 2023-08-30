const sql = require("../config/db.js");
const Utility = require("../controllers/utility.controller.js");
const passwordConfig = require("../config/password.config");
const logger = require("../logger.js");
const user = require("../models/user.model.js");

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
      
  	sql.query(`select idRuolo,idUtente,password,username from utente where (email= BINARY "${utenzaLogin.identificativo}" or username= BINARY "${utenzaLogin.identificativo}") and password=aes_encrypt("${utenzaLogin.password}", "${passwordConfig.KEY}")`, async (err, res) => {
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
				
				let cognome="",nome="";
				
				if(JSON.parse(JSON.stringify(res1)).length>0){
					cognome=JSON.parse(JSON.stringify(res1))[0].cognome;
					nome=JSON.parse(JSON.stringify(res1))[0].nome;
				}

				let token = await Utility.createToken({identificativo:utenzaLogin.identificativo,ruolo:desc,cognome:cognome,nome:nome},'3h');
			
				//if(res.idRuolo!=1)
					//logger.info(utenzaLogin.identificativo+": si è evoluto in dashboard");

				user.getInfoContoCorrente(res.idUtente,async (err, infoContoCorrente) =>{
					if(res.idRuolo!=1){
						if(infoContoCorrente.length==0)
							logger.info(await Utility.getDescriptionForEvolution(res.username,0));
						else if(infoContoCorrente.length==1)
							if(infoContoCorrente[0].saldo>0)
							logger.info(await Utility.getDescriptionForEvolution(res.username,1));
							else
							logger.info(await Utility.getDescriptionForEvolution(res.username,2));
						else{
							let flag=false;
					
							for(let i=0;i<infoContoCorrente.length;i++){
							if(infoContoCorrente[i].saldo>0){
								flag=true;
								break;
							}
							}
					
							if(flag)
							logger.info(await Utility.getDescriptionForEvolution(res.username,1));
							else
							logger.info(await Utility.getDescriptionForEvolution(res.username,2));
						}
					}
				});

				

      			result(null, {status:'200',token: token});
			});
		}
	});
}
module.exports=UtenzaLogin;