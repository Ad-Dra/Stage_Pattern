import { Anagrafica } from "../anagrafica";
import { ContoCorrente } from "../contoCorrente/contoCorrente";
import { Cliente } from "./cliente";

export class ClienteJunior extends Cliente{

    constructor(idUtente:number,anagrafica:Anagrafica,contiCorrenti:ContoCorrente[]){
        super(idUtente,2,anagrafica,contiCorrenti);
    }
}