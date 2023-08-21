import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Colonne } from '../components/grids/grid/grid/grid.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modifica-conti-corrrenti-utente',
  templateUrl: './modifica-conti-corrrenti-utente.component.html',
  styleUrls: ['./modifica-conti-corrrenti-utente.component.scss']
})
export class ModificaContiCorrrentiUtenteComponent {

  public denominazione:string="";
  public contiCorrente:any=[];
  public responseOk:boolean=false;
  public colonne:Colonne []=[
    {name:"Descrizione conto", field:'descrizione',isCurrency:false,isDate:false, persIcon:false},
    {name:"Saldo", field:'saldo',isCurrency:true,isDate:false, persIcon:false},
    {name:"Data creazione", field:'dataCreazione',isCurrency:false,isDate:true, persIcon:false}
  ]
  private idUtente:Number=0;

  constructor(private ngxSmartModalService:NgxSmartModalService,private http:HttpClient){

  }

  onDataLoaded(){
    let riga:any=this.ngxSmartModalService.getModalData("modificaContiCorrentiUtente");
    this.denominazione=riga.cognome+" "+riga.nome;
    this.idUtente=riga.idUtente;
    this.contiCorrente=[];
    this.getInfoContoCorrente();
  }

  getInfoContoCorrente(){
    this.http.get("/api/admin/getContiCorrenti/"+this.idUtente+".json").subscribe((res:any)=>{
      if(res){
        this.contiCorrente=[...res];
        this.responseOk=true;
      }
    })
  }

  azione(riga:any){
    switch(riga.tipoAzione){
      case 'cancella':
        this.cancella(riga);
      break;
    }
  }

  cancella(riga:any){
    this.ngxSmartModalService.resetModalData("confermaCancellazione");
    this.ngxSmartModalService.setModalData(riga,"confermaCancellazione");
    this.ngxSmartModalService.open("confermaCancellazione");
  }

  cancellaContoCorrente(){
    let riga:any=this.ngxSmartModalService.getModalData("confermaCancellazione");

    this.http.delete("/api/admin/deleteContoCorrente.json",{body:{"idContoCorrente":riga.idContoCorrente}}).subscribe((res:any)=>{
      if(res && res.message){
        this.contiCorrente.splice(riga.index,1);
        if(this.contiCorrente.length==0)
          this.onClose();
      }
    })
  }

  onClose(){
    this.ngxSmartModalService.close("modificaContiCorrentiUtente");
  }
}
