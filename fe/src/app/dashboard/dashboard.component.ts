import { Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { Stage } from '../stage/stage';
import { HttpClient } from '@angular/common/http';
import { Colonne } from '../components/grids/grid/grid/grid.component';
import { LoginComponent } from '../login/login.component';
import { InfoAccountComponent } from '../info-account/info-account.component';
import { ChiSiamoComponent } from '../chi-siamo/chi-siamo.component';
import { MovimentiComponent } from '../movimenti/movimenti.component';
import { BonificoComponent } from '../bonifico/bonifico.component';
import { RicaricaTelefonicaComponent } from '../ricarica-telefonica/ricarica-telefonica.component';
import { PrestitoComponent } from '../prestito/prestito.component';
import { Utente } from '../stage/utente';
import { UtenteSaldoPassivo } from '../utenteInterfacce/utente-saldo-passivo';
import { UtenteSaldoAttivo } from '../utenteInterfacce/utente-saldo-attivo';
import { UtenteNuovo } from '../utenteInterfacce/utente-nuovo';
import { COMPONENT_B_TOKEN } from '../app.module';

const dashboardSaldoPassivo: UtenteSaldoPassivo = {
  home() {
    this.typeComp=DashboardComponent.name;
  },
  chiSiamo() {
    this.typeComp=ChiSiamoComponent.name;
  },
  prestito() {
    this.typeComp=PrestitoComponent.name;
  },
  getInfAccount() {
    this.typeComp=InfoAccountComponent.name;
  },
  getMovimenti() {
    this.typeComp=MovimentiComponent.name;
  },
  renew(t: Stage) {
    Object.setPrototypeOf(this, t);
  },
  logOut() {
    sessionStorage.clear();
  },
  typeComp: "DashboardComponent",
  type:"dashboardSaldoPassivo"
};

const dashboardSaldoAttivo: UtenteSaldoAttivo = {
  home() {
    this.typeComp=DashboardComponent.name;
  },
  chiSiamo() {
    this.typeComp=ChiSiamoComponent.name;
  },
  bonifico() {
    this.typeComp=BonificoComponent.name;
  },
  prestito() {
    this.typeComp=PrestitoComponent.name;
  },
  ricaricaTelefonica() {
    this.typeComp=RicaricaTelefonicaComponent.name;
  },
  getInfAccount() {
    this.typeComp=InfoAccountComponent.name;
  },
  getMovimenti() {
   this.typeComp=MovimentiComponent.name;
  },
  logOut() {
    sessionStorage.clear();
  },
  renew(t: Stage) {
    Object.setPrototypeOf(this, t);
  },
  typeComp: "DashboardComponent",
  type:"dashboardSaldoAttivo"
};

const notContoCorrenteDashboard: UtenteNuovo = {
  home() {
    this.typeComp=DashboardComponent.name;
  },
  chiSiamo() {
    this.typeComp=ChiSiamoComponent.name;
  },
  getInfAccount() {
    this.typeComp=InfoAccountComponent.name;
  },
  logOut() {
    sessionStorage.clear();
  },
  renew(t: Stage) {
    Object.setPrototypeOf(this, t);
  },
  typeComp: "DashboardComponent",
  type:"notContoCorrenteDashboard"
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends Utente implements OnInit{

  @Input() denominazione:any;
  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();

  public saldo:any="0.0";
  public contiCorrente:any=[];
  public responseOk:boolean=false;
  public colonne:Colonne []=[
    {name:"Descrizione conto", field:'descrizione',isCurrency:false,isDate:false, persIcon:false},
    {name:"Saldo", field:'saldo',isCurrency:true,isDate:false, persIcon:false},
    {name:"Data creazione", field:'dataCreazione',isCurrency:false,isDate:true, persIcon:false}
  ]
  
  public dashboard: UtenteNuovo | UtenteSaldoAttivo | UtenteSaldoPassivo | any = {};

  constructor(private http:HttpClient,@Inject(COMPONENT_B_TOKEN)private login:LoginComponent){
    super();
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("statusObject") && sessionStorage.getItem("statusObject")!=null && sessionStorage.getItem("statusObject")!='undefined')
      this.dashboard.typeComp=sessionStorage.getItem("statusObject")!='DashboardComponent' ? sessionStorage.getItem("statusObject")?.split("_")[1] : sessionStorage.getItem("statusObject");

    this.getInfoContoCorrente();
  }

  getInfoContoCorrente(): void{
    this.http.get("/api/getInfoContoCorrente.json").subscribe((res:any)=>{
      if(res){
        this.contiCorrente=res;
        this.responseOk=true;
       
       // this.contiCorrente=[...this.contiCorrente,{saldo:12.3,descrizione:"mio"}];
        if(this.contiCorrente.length==0)
          this.renew(this.dashboard,notContoCorrenteDashboard);
        else if(this.contiCorrente.length==1 && this.contiCorrente[0].saldo<=0)
          this.renew(this.dashboard,dashboardSaldoPassivo);
        else if(this.contiCorrente.length==1 && this.contiCorrente[0].saldo>0)
          this.renew(this.dashboard,dashboardSaldoAttivo);
        else{
          let haveMoney:boolean=false;
          for(let i=0;i<this.contiCorrente.length;i++){
            if(this.contiCorrente[i].saldo>0){
              this.renew(this.dashboard,dashboardSaldoAttivo);
              haveMoney=true;
              break;
            }
          }

          if(!haveMoney)
            this.renew(this.dashboard,dashboardSaldoPassivo);
        }

        this.dashboard.home();
      }
    })
  }

  /**------Azioni eseguite sia se non si ha un conto corrente sia se il saldo è negativo o positivo----- */
  home(){
    this.dashboard?.home();
    this.changeType.emit({comp:DashboardComponent});
  }

  chiSiamo(){
    this.dashboard?.chiSiamo();
    this.changeType.emit({comp:ChiSiamoComponent,isDashboard:"DashboardComponent"});
  }

  getInfAccount(){
    this.dashboard?.getInfAccount();
    this.changeType.emit({comp:InfoAccountComponent,isDashboard:"DashboardComponent"});
  }

  logOut(){
    this.http.post("/api/logout.json",null).subscribe((res:any)=>{
      this.renew(this,this.login);
      this.dashboard?.logOut();
      this.changeType.emit({comp:LoginComponent});
    });
  }

  /**------Azioni eseguite solo se si ha un conto corrente------- */
  getMovimenti(){
    this.dashboard.getMovimenti();
    this.changeType.emit({comp:MovimentiComponent,isDashboard:"DashboardComponent"});
  }

  prestito(){
    this.dashboard.prestito();
    this.changeType.emit({comp:PrestitoComponent,isDashboard:"DashboardComponent"});
  }

  /**------Azioni eseguite solo se il saldo è positivo------- */

  bonifico(){
    this.dashboard.bonifico();
    this.changeType.emit({comp:BonificoComponent,isDashboard:"DashboardComponent"});
  }

  ricaricaTelefonica(){
    this.dashboard.ricaricaTelefonica();
    this.changeType.emit({comp:RicaricaTelefonicaComponent,isDashboard:"DashboardComponent"});
  }
}