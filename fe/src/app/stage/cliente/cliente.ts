import { Anagrafica } from "../anagrafica";
import { ContoCorrente } from "../contoCorrente/contoCorrente";

export abstract class Cliente{

    private idUtente:Number | undefined;
    private idRuolo:Number | undefined;
    private anagrafica: Anagrafica | undefined;
    private contiCorrenti: ContoCorrente[] | undefined;

    constructor(idUtente:Number,idRuolo:Number,anagrafica:Anagrafica,contiCorrenti:ContoCorrente[]){
        this.idUtente=idUtente;
        this.idRuolo=idRuolo;
        this.anagrafica=anagrafica;
        this.contiCorrenti=contiCorrenti;
    }

    getIdUtente(){
        return this.idUtente;
    }

    getIdRuolo(){
        return this.idRuolo;
    }

    getAnagrafica(){
        return this.anagrafica;
    }

    getContiCorrenti(){
        return this.contiCorrenti;
    }
}