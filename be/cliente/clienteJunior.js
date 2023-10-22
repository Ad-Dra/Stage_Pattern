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
    async renew(){
        super.renew(ClienteSenior.prototype);
        Object.assign(this,{idUtente:this.idUtente,idRuolo:3,contiCorrenti:[]});

        let anagrafica=await this.getAnagrafica();
        await this.getContiCorrenti();
        await this.refreshRuolo();
        this.generaCartaDiCredito();

        logger.info("Il cliente junior "+anagrafica.username+" si è evoluto in cliente senior");
    }
}

module.exports = ClienteJunior;