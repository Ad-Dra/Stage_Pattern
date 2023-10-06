const Cliente = require("./cliente");
const ClienteSenior = require("./clienteSenior");
const logger = require("../logger.js");
//const Utility = require("../controllers/utility.controller.js");

class ClienteJunior extends Cliente{


    constructor(idUtente){
        super(idUtente,2);
    }

    async renew(cliente){
        let newCliente= await new ClienteSenior(this.idUtente);
        await newCliente.getAnagrafica();
        await newCliente.getContiCorrenti();
        Object.setPrototypeOf(cliente,newCliente);
        await Object.assign(cliente,newCliente);
        await cliente.refreshRuolo();


       // logger.info("Il cliente "+await JSON.parse(JSON.stringify(Utility.getDatiUtente(this.idUtente)))[0].username+" junior si è evoluto in cliente senior");

        return cliente;
    }

}

module.exports = ClienteJunior;