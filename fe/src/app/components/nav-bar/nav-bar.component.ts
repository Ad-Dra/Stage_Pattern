import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public cont:any;
  public avatar:string="";
  public notifiche:any=[];
  public numNotifiche:number=0;
  public responseOk:boolean=false;

  constructor() { 
  }

  ngOnInit(): void {
    //this.refreshCarrello();
    this.getAvatar();
    //this.getNotifiche();
    
    /*this.infUtente.name.subscribe(()=>{
      this.getAvatar();
    })*/

   /* this.ordine.name.subscribe((val) => {
      this.refreshCarrello();
      this.getNotifiche();
    });*/
  }

  getAvatar(){
   /* this.service.get("getAvatar.json").subscribe(data => {
      if(data && data.length>0)
        this.avatar=data[0].avatar;
    });*/
  }

  getNotifiche(){
    /*this.service.get("getNotificaUtente.json").subscribe(data => {
      if(data && data.elementList){
        this.numNotifiche=data.numNotificheNonVis;
        this.notifiche=data.elementList;
        this.responseOk=true;
      }
    });*/
  }

  ordina(){
    //if(location.hash!='#/ordina')
     // this.route.navigate(["/ordina"]);
  }

  logOut(){
    //this.loginService.logout();
    sessionStorage.clear();
    this.cont=0;
    //this.route.navigate(["/login"]);
  }

  refreshCarrello(){
   // this.service.get("getNumProdCarrello.json").subscribe(response=>{this.cont=response[0].numeroOggetti;});
  }

  segnalazioni(){
   // this.route.navigate(["/segnalazioni"])
  }

  getCarrello(){
    /*if(this.cont>0)
      this.route.navigate(["/riepilogoOrdine"])
    else{
      this.message.warn('Carrello vuoto','',{
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }*/
  }

  getInfAccount(){
    //this.ngxSmartModalService.open("informazioniAccount");
  }

  help(){
    //this.ngxSmartModalService.open("helpUtente");
  }

  visualizza(idNotifica:number){
    let parametro={
      idNotifica:idNotifica
    }
    //this.service.put("updateStateNotifica.json",parametro).subscribe(data=>{this.getNotifiche();});
  }

  cancella(idNotifica:number){
    //this.service.delete("cancellaNotifica.json",{idNotifica:idNotifica}).subscribe(data=>{this.getNotifiche();});
  }

  visualizzaAllNotifiche(){
    //this.service.put("visualizzaAllNotifiche.json",null).subscribe(data=>{this.getNotifiche();});
  }

  cancellaAllNotifiche(){
    //.service.delete("cancellaAllNotifiche.json").subscribe(data=>{this.getNotifiche();});
  }
}
