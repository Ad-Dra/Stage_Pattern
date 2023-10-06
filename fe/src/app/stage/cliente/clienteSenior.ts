import { Anagrafica } from "../anagrafica";
import { ContoCorrente } from "../contoCorrente/contoCorrente";
import { Cliente } from "./cliente";


export class ClienteSenior extends Cliente{
    
    private cartaCredito:string | undefined;

    constructor(idUtente:number,anagrafica:Anagrafica,contiCorrenti:ContoCorrente[],cartaCredito:string){
        super(idUtente,3,anagrafica,contiCorrenti);

        this.cartaCredito=cartaCredito;
    }

}