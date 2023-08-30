import { Stage } from "./stage";


export abstract class Utente implements Stage{


    renew(currentType:Stage,newType: Stage): void {
        Object.setPrototypeOf(currentType, newType);
    }
}