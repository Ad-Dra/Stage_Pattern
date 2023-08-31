import { Utente } from "../stage/utente";

export interface UtenteSaldoAttivo extends Utente{
    home(): void;
    chiSiamo(): void;
    prestito(): void;
    getInfAccount(): void;
    getMovimenti(): void;
    logOut(): void;
    bonifico():void;
    ricaricaTelefonica():void;
    typeComp:any;
    type:string;
}
