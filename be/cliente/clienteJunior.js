const logger = require("../logger.js");

const Cliente = require("./cliente");
const ClienteSenior = require("./clienteSenior");

class ClienteJunior extends Cliente{

    constructor(idUtente){
        super(idUtente,2);
    }

    /**
     * Il seguente metodo si occupa di far evolvere un Cliente Junior in Cliente Senior
     *  
     * @param {*} cliente da far evolvere
     * 
     * @returns cliente evoluto
     */
    async renew(cliente){
        let newCliente= await new ClienteSenior(this.idUtente);
        let anagrafica=await newCliente.getAnagrafica();
        await newCliente.getContiCorrenti();
        Object.setPrototypeOf(cliente,newCliente);
        await Object.assign(cliente,newCliente);
        await cliente.refreshRuolo();

        logger.info("Il cliente junior "+anagrafica.username+" si è evoluto in cliente senior");

        return cliente;
    }
}

module.exports = ClienteJunior;