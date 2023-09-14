const Cliente = require("./cliente");


class ClienteJunior extends Cliente{


    constructor(idUtente){
        super(idUtente,2);
    }

    renew(cartaDiCredito){
        
    }

}


module.exports = ClienteJunior;