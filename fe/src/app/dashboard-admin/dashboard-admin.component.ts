import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { InfoAccountComponent } from '../info-account/info-account.component';
import { Stage } from '../stage/stage';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { COMPONENT_B_TOKEN } from '../app.module';
import { Colonne } from '../components/grids/grid/grid/grid.component';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements Stage, OnInit{
  public type:any=DashboardAdminComponent.name;
  public identificativo:string="";
  public responseOk:boolean=false;
  public clienti:any=[];
  public colonne:Colonne []=[
    {name:"Cognome", field:'cognome',isCurrency:false,isDate:false, persIcon:false},
    {name:"Nome", field:'nome',isCurrency:false,isDate:false, persIcon:false},
    {name:"Data nascita", field:'dataNascita',isCurrency:false,isDate:true, persIcon:false},
    {name:"email", field:'email',isCurrency:false,isDate:false, persIcon:false},
    {name:"Username", field:'username',isCurrency:false,isDate:false, persIcon:false}
  ]

  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private http:HttpClient,@Inject(COMPONENT_B_TOKEN)private login:LoginComponent,public ngxSmartModalService: NgxSmartModalService){

  }

  ngOnInit(): void {
    if(sessionStorage.getItem("statusObject") && sessionStorage.getItem("statusObject")!=null && sessionStorage.getItem("statusObject")!='undefined')
      this.type=sessionStorage.getItem("statusObject")!='DashboardAdminComponent' ? sessionStorage.getItem("statusObject")?.split("_")[1] : sessionStorage.getItem("statusObject");

    if(this.type=="DashboardAdminComponent"){
      this.getInfoAccount();
      this.getUtenti();
    }
  }

  getInfoAccount(){
    this.http.get("/api/getinfoAccount.json").subscribe((res:any)=>{
      if(res && res.length>0){
        this.identificativo=res[0].cognome+" "+res[0].nome;
      }
    })
  }

  getUtenti(){
    this.http.get("/api/admin/getUtenti.json").subscribe((res:any)=>{
      if(res){
        this.clienti=res;
        this.responseOk=true;
      }
    })
  }

  home() {
    this.type=DashboardAdminComponent.name;
    this.changeType.emit({comp:DashboardAdminComponent});
    this.getInfoAccount();
    this.getUtenti();
  }

  getInfAccount() {
    this.changeType.emit({comp:InfoAccountComponent,isDashboard:"DashboardAdminComponent"});
    this.type=InfoAccountComponent.name;
  }

  logOut() {
    sessionStorage.clear();
    this.renew(this.login);
    this.changeType.emit({comp:LoginComponent});
  }

  renew(t: Stage) {
    Object.setPrototypeOf(this, t);
  }

  azione(riga:any){
    switch(riga.tipoAzione){
      case 'aggiungi':
        this.crea(riga);
      break;

      /*case 'cancella':
        this.cancella(riga.idProdotto);
      break;*/
    }
  }

  crea(riga:any){
    this.ngxSmartModalService.resetModalData("creaContoCorrente");
    this.ngxSmartModalService.setModalData(riga,"creaContoCorrente");
    this.ngxSmartModalService.open("creaContoCorrente");
  }
}
