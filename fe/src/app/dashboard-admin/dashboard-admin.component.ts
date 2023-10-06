import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colonne } from '../components/grids/grid/grid/grid.component';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit{

  @Input() denominazione:any;
  public responseOk:boolean=false;
  public clienti:any=[];
  public colonne:Colonne []=[
    {name:"Cognome", field:'cognome',isCurrency:false,isDate:false, persIcon:false},
    {name:"Nome", field:'nome',isCurrency:false,isDate:false, persIcon:false},
    {name:"Data nascita", field:'dataNascita',isCurrency:false,isDate:true, persIcon:false},
    {name:"email", field:'email',isCurrency:false,isDate:false, persIcon:false},
    {name:"Username", field:'username',isCurrency:false,isDate:false, persIcon:false}
  ]

  constructor(private http:HttpClient,public ngxSmartModalService: NgxSmartModalService){

  }

  ngOnInit(): void {
    this.getUtenti();
  }

  getInfoAccount(){
    this.http.get("/api/getinfoAccount.json").subscribe((res:any)=>{
      if(res && res.length>0){
        //this.identificativo=res[0].cognome+" "+res[0].nome;
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

  azione(riga:any){
    switch(riga.tipoAzione){
      case 'aggiungi':
        this.crea(riga);
      break;
      case 'modifica':
        this.modifica(riga);
      break;
      case 'cancella':
        this.cancella(riga);
      break;
    }
  }

  crea(riga:any){
    this.ngxSmartModalService.resetModalData("creaContoCorrente");
    this.ngxSmartModalService.setModalData(riga,"creaContoCorrente");
    this.ngxSmartModalService.open("creaContoCorrente");
  }

  modifica(riga:any){
    this.ngxSmartModalService.resetModalData("modificaContiCorrentiUtente");
    this.ngxSmartModalService.setModalData(riga,"modificaContiCorrentiUtente");
    this.ngxSmartModalService.open("modificaContiCorrentiUtente");
  }

  cancella(riga:any){
    this.ngxSmartModalService.resetModalData("confCancellazione");
    this.ngxSmartModalService.setModalData(riga,"confCancellazione");
    this.ngxSmartModalService.open("confCancellazione");
  }

  cancellaAccount(){
    let riga:any=this.ngxSmartModalService.getModalData("confCancellazione");

    this.http.delete("/api/admin/deleteAccount.json",{body:{"idUtente":riga.idUtente}}).subscribe((res:any)=>{
      if(res && res.message)
        this.clienti.splice(riga.index,1)
    })
  }
}
