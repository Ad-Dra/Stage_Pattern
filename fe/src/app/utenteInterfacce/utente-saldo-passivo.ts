import { Utente } from "../stage/utente";

export interface UtenteSaldoPassivo extends Utente{
    home(): void;
    chiSiamo(): void;
    prestito(): void;
    getInfAccount(): void;
    getMovimenti(): void;
    logOut(): void;
    typeComp:any;
    type:string;
}
