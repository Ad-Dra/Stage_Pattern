import { ContoCorrente } from "./contoCorrente";

export class ContoCorrentePassivoJunior extends ContoCorrente{

    constructor(idContoCorrente:Number,saldo: Number,iban: string,dataCreazione: string,descrizione: string){
        super(idContoCorrente,saldo,iban,dataCreazione,descrizione);
    }
}