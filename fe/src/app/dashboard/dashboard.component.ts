import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Stage } from '../stage/stage';
import { HttpClient } from '@angular/common/http';
import { Colonne } from '../components/grids/grid/grid/grid.component';

interface dashboardInterface extends Stage{
  home(): void;
  chiSiamo(): void;
  mutuo(): void;
  prestito(): void;
  getInfAccount(): void;
  getMovimenti(): void;
  logOut(): void;
  renew(t:any):void;
}
/*
const dashboardSaldoPassivo: dashboardInterface = {

  home() {
    this.renew(DashboardComponent);
    //this.changeType.emit(DashboardComponent);
  },
  chiSiamo() {
    
  },
  mutuo() {
    
  },
  prestito() {
    
  },
  getInfAccount() {
    
  },
  getMovimenti() {
    
  },
  logOut() {
    
  },
};
*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements Stage,OnInit{
  
  public identificativo:string="";
  public saldo:any="0.0";
  public contiCorrente:any=[];
  public responseOk:boolean=false;
  public colonne:Colonne []=[
    {name:"Descrizione conto", field:'descrizione',isCurrency:false,isDate:false, persIcon:false},
    {name:"Saldo", field:'saldo',isCurrency:true,isDate:false, persIcon:false},
    {name:"Data creazione", field:'dataCreazione',isCurrency:false,isDate:true, persIcon:false}
  ]

  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();
  
  public lamp: dashboardInterface | undefined;

  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    this.getInfoAccount();
    this.getSaldo();
   // (this.lamp as any).da();
  }

  getInfoAccount(){
    this.http.get("/api/getinfoAccount.json").subscribe((res:any)=>{
      if(res && res.length>0){
        this.identificativo=res[0].cognome+" "+res[0].nome;
      }
    })
  }

  getSaldo(){
    this.http.get("/api/getSaldo.json").subscribe((res:any)=>{
      if(res){
        this.contiCorrente=res;
        this.responseOk=true;
        this.contiCorrente=[...this.contiCorrente,{saldo:12.3,descrizione:"mio"}];
      }
    })
  }

  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }
}
