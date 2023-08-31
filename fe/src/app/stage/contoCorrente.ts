import { Stage } from "./stage";


export abstract class ContoCorrente implements Stage{

    renew(currentType:Stage,newType: Stage): void {
        Object.setPrototypeOf(currentType, newType);
    }

    movimento(){

    }

    prestito(){
        
    }
}