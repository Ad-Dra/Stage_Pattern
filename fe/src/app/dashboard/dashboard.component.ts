import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Stage } from '../stage/stage';
import { HttpClient } from '@angular/common/http';
import { Colonne } from '../components/grids/grid/grid/grid.component';
import { LoginComponent } from '../login/login.component';
import { InfoAccountComponent } from '../info-account/info-account.component';
import { ChiSiamoComponent } from '../chi-siamo/chi-siamo.component';
import { MovimentiComponent } from '../movimenti/movimenti.component';
import { BonificoComponent } from '../bonifico/bonifico.component';
import { RicaricaTelefonicaComponent } from '../ricarica-telefonica/ricarica-telefonica.component';

interface dashboardInterface extends Stage{
  home(): void;
  chiSiamo(): void;
  prestito(): void;
  getInfAccount(): void;
  getMovimenti(): void;
  logOut(): void;
  renew(t:any):void;
  type:any;
  changeType:EventEmitter<any>;
}

interface dashboardInterfaceAttiva extends Stage{
  home(): void;
  chiSiamo(): void;
  prestito(): void;
  getInfAccount(): void;
  getMovimenti(): void;
  logOut(): void;
  bonifico():void;
  ricaricaTelefonica():void;
  renew(t:any):void;
  type:any;
  changeType:EventEmitter<any>;
}

interface notContoCorrenteDashboardInterface extends Stage{
  home(): void;
  chiSiamo(): void;
  getInfAccount(): void;
  logOut(): void;
  renew(t:any):void;
  type:any;
  changeType:EventEmitter<any>;
}

const dashboardSaldoPassivo: dashboardInterface = {
  home() {
    this.type=DashboardComponent.name;
    this.changeType.emit({comp:DashboardComponent});
  },
  chiSiamo() {
    this.type=ChiSiamoComponent.name;
    this.changeType.emit({comp:ChiSiamoComponent,isDashboard:"DashboardComponent"});
  },
  prestito() {
  },
  getInfAccount() {
    this.changeType.emit({comp:InfoAccountComponent,isDashboard:"DashboardComponent"});
    this.type=InfoAccountComponent.name;
  },
  getMovimenti() {
    this.type=MovimentiComponent.name;
    this.changeType.emit({comp:MovimentiComponent,isDashboard:"DashboardComponent"});
  },
  logOut() {
    sessionStorage.clear();
    this.renew(LoginComponent);
    this.changeType.emit({comp:LoginComponent});
  },
  renew(t: Stage) {
    Object.setPrototypeOf(this, t);
  },
  changeType: new EventEmitter<any>(),
  type: undefined
};

const dashboardSaldoAttivo: dashboardInterfaceAttiva = {
  home() {
    this.type=DashboardComponent.name;
    this.changeType.emit({comp:DashboardComponent});
  },
  chiSiamo() {
    this.type=ChiSiamoComponent.name;
    this.changeType.emit({comp:ChiSiamoComponent,isDashboard:"DashboardComponent"});
  },
  bonifico() {
    this.type=BonificoComponent.name;
    this.changeType.emit({comp:BonificoComponent,isDashboard:"DashboardComponent"});
  },
  prestito() {
  },
  ricaricaTelefonica() {
    this.type=RicaricaTelefonicaComponent.name;
    this.changeType.emit({comp:RicaricaTelefonicaComponent,isDashboard:"DashboardComponent"});
  },
  getInfAccount() {
    this.type=InfoAccountComponent.name;
    this.changeType.emit({comp:InfoAccountComponent,isDashboard:"DashboardComponent"});
  },
  getMovimenti() {
   this.type=MovimentiComponent.name;
   this.changeType.emit({comp:MovimentiComponent,isDashboard:"DashboardComponent"});
  },
  logOut() {
    sessionStorage.clear();
    this.renew(LoginComponent);
    this.changeType.emit({comp:LoginComponent});
  },
  renew(t: Stage) {
    Object.setPrototypeOf(this, t);
  },
  changeType: new EventEmitter<any>(),
  type: undefined
};

const notContoCorrenteDashboard: notContoCorrenteDashboardInterface = {
  home() {
    this.type=DashboardComponent.name;
    this.changeType.emit({comp:DashboardComponent});
  },
  chiSiamo() {
    this.type=ChiSiamoComponent.name;
    this.changeType.emit({comp:ChiSiamoComponent,isDashboard:"DashboardComponent"});
  },
  getInfAccount() {
    this.changeType.emit({comp:InfoAccountComponent,isDashboard:"DashboardComponent"});
    this.type=InfoAccountComponent.name;
  },
  logOut() {
    sessionStorage.clear();
    this.renew(LoginComponent);
    this.changeType.emit({comp:LoginComponent});
  },
  renew(t: Stage) {
    Object.setPrototypeOf(this, t);
  },
  changeType: new EventEmitter<any>(),
  type: undefined
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements Stage,OnInit{

  public type:any=DashboardComponent.name;

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
  
  public dashboard: dashboardInterface | dashboardInterfaceAttiva | undefined;

  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    if(sessionStorage.getItem("statusObject") && sessionStorage.getItem("statusObject")!=null && sessionStorage.getItem("statusObject")!='undefined')
      this.type=sessionStorage.getItem("statusObject")!='DashboardComponent' ? sessionStorage.getItem("statusObject")?.split("_")[1] : sessionStorage.getItem("statusObject");

    this.getInfoAccount();
    this.getInfoContoCorrente();
  }

  getInfoAccount(){
    this.http.get("/api/getinfoAccount.json").subscribe((res:any)=>{
      if(res && res.length>0){
        this.identificativo=res[0].cognome+" "+res[0].nome;
      }
    })
  }

  getInfoContoCorrente(){
    this.http.get("/api/getInfoContoCorrente.json").subscribe((res:any)=>{
      if(res){
        this.contiCorrente=res;
        this.responseOk=true;
       // this.contiCorrente=[...this.contiCorrente,{saldo:12.3,descrizione:"mio"}];
       if(this.contiCorrente.length==0)
        this.dashboard=this.renew(notContoCorrenteDashboard);
       else if(this.contiCorrente.length==1 && this.contiCorrente[0].saldo==0.0)
        this.dashboard=this.renew(dashboardSaldoPassivo);
       else
        this.dashboard=this.renew(dashboardSaldoAttivo);
      }
    })
  }

  /**------Azioni eseguite sia se non si ha un conto corrente sia se il saldo è negativo o positivo----- */
  home(){
    this.dashboard?.home();
  }

  chiSiamo(){
    this.dashboard?.chiSiamo();
  }

  getInfAccount(){
    this.dashboard?.getInfAccount();
  }

  logOut(){
    this.dashboard?.logOut();
  }

  /**------Azioni eseguite solo se si ha un conto corrente------- */
  getMovimenti(){
    this.dashboard?.getMovimenti();
  }

  prestito(){
    (this.dashboard as dashboardInterfaceAttiva).prestito();
  }

  /**------Azioni eseguite solo se il saldo è positivo------- */

  bonifico(){
    (this.dashboard as dashboardInterfaceAttiva).bonifico();
  }

  ricaricaTelefonica(){
    (this.dashboard as dashboardInterfaceAttiva).ricaricaTelefonica();
  }

  renew(newType: Stage) {
    return Object.setPrototypeOf(this, newType);
  }
}
