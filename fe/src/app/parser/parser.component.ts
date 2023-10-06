import { Component, EventEmitter, Output } from "@angular/core";
import { ClienteJunior } from "../stage/cliente/clienteJunior";
import { ClienteSenior } from "../stage/cliente/clienteSenior";
import { ContoCorrente } from "../stage/contoCorrente/contoCorrente";
import { ContoCorrenteAttivoJunior } from "../stage/contoCorrente/contoCorrenteAttivoJunior";
import { ContoCorrenteAttivoSenior } from "../stage/contoCorrente/contoCorrenteAttivoSenior";
import { ContoCorrentePassivoJunior } from "../stage/contoCorrente/contoCorrentePassivoJunior";
import { ContoCorrentePassivoSenior } from "../stage/contoCorrente/contoCorrentePassivoSenior";
import { ParserService } from "./parserService";

@Component({
    selector: 'app-parser',
    templateUrl: './parser.component.html',
    styleUrls: ['./parser.component.scss']
})

export class ParserComponent{

    private token: any | undefined;
    private cliente: ClienteJunior | ClienteSenior | undefined;

    constructor(public parser:ParserService){
    }

    parseData(cl?:any){
        if(sessionStorage.getItem("token")){
            this.token=sessionStorage.getItem("token")?.split('.')[1];
            this.token=JSON.parse(atob(this.token)).cliente;
        }

        let cliente;
        
        if(cl)
            cliente = cl;
        else
            cliente = this.token;

        if(cliente.idRuolo==2){
            let cc : ContoCorrente[]=this.setContiCorrenti(cliente.contiCorrenti,cliente.idRuolo);

            this.cliente = new ClienteJunior(cliente.idRuolo,cliente.anagrafica,cc);
        }else{
            let cc : ContoCorrente[]=this.setContiCorrenti(cliente.contiCorrenti,cliente.idRuolo);

            this.cliente = new ClienteSenior(cliente.idRuolo,cliente.anagrafica,cc,cliente.cartaDiCredito);
        }

        this.parser.addSub(this.cliente);
    }

    setContiCorrenti(contiCorrenti:any,idRuolo:number):ContoCorrente[]{
        let cc:any=[];
        let j=0;

        for(let i=0;i<contiCorrenti.length;i++){
            if(contiCorrenti[i]!=null){
                if(contiCorrenti[i].saldo>0 && idRuolo==2)
                    cc[j]=new ContoCorrenteAttivoJunior(contiCorrenti[i].idContoCorrente,contiCorrenti[i].saldo,contiCorrenti[i].iban,contiCorrenti[i].dataCreazione,contiCorrenti[i].descrizione);
                else if(contiCorrenti[i].saldo>0 && idRuolo==3)
                    cc[j]=new ContoCorrenteAttivoSenior(contiCorrenti[i].idContoCorrente,contiCorrenti[i].saldo,contiCorrenti[i].iban,contiCorrenti[i].dataCreazione,contiCorrenti[i].descrizione);
                else if(contiCorrenti[i].saldo<0 && idRuolo==2)
                    cc[j]=new ContoCorrentePassivoJunior(contiCorrenti[i].idContoCorrente,contiCorrenti[i].saldo,contiCorrenti[i].iban,contiCorrenti[i].dataCreazione,contiCorrenti[i].descrizione);
                else 
                    cc[j]=new ContoCorrentePassivoSenior(contiCorrenti[i].idContoCorrente,contiCorrenti[i].saldo,contiCorrenti[i].iban,contiCorrenti[i].dataCreazione,contiCorrenti[i].descrizione);                
                
                j++;
            }
        }

        return cc;
    }
}