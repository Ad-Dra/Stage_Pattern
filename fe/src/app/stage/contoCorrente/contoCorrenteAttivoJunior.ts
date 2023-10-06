import { ContoCorrenteAttivo } from "./contoCorrenteAttivo";


export class ContoCorrenteAttivoJunior extends ContoCorrenteAttivo{

    constructor(idContoCorrente:Number,saldo: Number,iban: string,dataCreazione: string,descrizione: string){
        super(idContoCorrente,saldo,iban,dataCreazione,descrizione);
    }
}