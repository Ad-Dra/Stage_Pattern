const Cliente = require("./cliente");
const ClienteSenior = require("./clienteSenior");


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
        return cliente;
    }

}


module.exports = ClienteJunior;