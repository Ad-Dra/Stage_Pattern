import { Utente } from "../stage/utente";

export interface UtenteNuovo extends Utente {
    home(): void;
    chiSiamo(): void;
    getInfAccount(): void;
    logOut(): void;
    typeComp:any;
    type:string;
}