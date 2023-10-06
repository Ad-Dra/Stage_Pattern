import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ParserService{

    private sub:Subject<any> = new BehaviorSubject<any>([]);

    getCliente(){
        return this.sub;
    }

    addSub(sub:any){
        this.sub.next(sub);
    }
}
    