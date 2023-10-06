import { ContoCorrente } from "./contoCorrente";

export class ContoCorrentePassivoSenior extends ContoCorrente{

    constructor(idContoCorrente:Number,saldo: Number,iban: string,dataCreazione: string,descrizione: string){
        super(idContoCorrente,saldo,iban,dataCreazione,descrizione);
    }

    prestito(dati:any,http:any,route:any){
        http.post("/api/richiediPrestito.json",dati).subscribe((res:any)=>{
            if(res)
                route.navigate(["/dashboard"]);
        });
    }
}