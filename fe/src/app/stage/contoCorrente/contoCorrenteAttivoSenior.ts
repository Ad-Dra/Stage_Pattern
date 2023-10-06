import { ContoCorrenteAttivo } from "./contoCorrenteAttivo";

export class ContoCorrenteAttivoSenior extends ContoCorrenteAttivo{

    constructor(idContoCorrente:Number,saldo: Number,iban: string,dataCreazione: string,descrizione: string){
        super(idContoCorrente,saldo,iban,dataCreazione,descrizione);
    }

    ricaricaTelefonica(dati:any,http:any,route:any){
        http.post("/api/creaRicaricaTelefonica.json",dati).subscribe((res:any)=>{
            if(res)
                route.navigate(["/dashboard"]);
        });
    }

    prestito(dati:any,http:any,route:any){
        http.post("/api/richiediPrestito.json",dati).subscribe((res:any)=>{
            if(res)
                route.navigate(["/dashboard"]);
        });
    }
}