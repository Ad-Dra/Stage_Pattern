import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class ConfigService{

    private conf:any;


    constructor(){
        this.conf=document.getElementById('configJson');
        this.conf=(JSON.parse(this.conf.innerHTML))
    }

    getLable(chiave:string){
        let label=this.conf["labels"][chiave];
        if(label==undefined)
            return "Label non trovata";
        else
            return label;
    }
}