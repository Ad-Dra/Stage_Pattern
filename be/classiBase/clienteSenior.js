const Cliente = require("./cliente");


class ClienteSenior extends Cliente{

    constructor(idUtente){
        super(idUtente,3);
        
        this.cartaDiCredito=null;
    }


}


module.exports = ClienteSenior;