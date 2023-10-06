import { ContoCorrente } from "./contoCorrente";


export class ContoCorrenteAttivo extends ContoCorrente{

    constructor(idContoCorrente:Number,saldo: Number,iban: string,dataCreazione: string,descrizione: string){
        super(idContoCorrente,saldo,iban,dataCreazione,descrizione);
    }

    bonifico(dati:any,http:any,route:any){
        http.post("/api/creaBonifico.json",dati).subscribe((res:any)=>{
            if(res)
                route.navigate(["/dashboard"]);
        })
    }
}