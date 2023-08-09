import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';
import { Stage } from 'src/app/stage/stage';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements Stage,OnInit {

  public notifiche:any=[];
  public numNotifiche:number=0;
  public isNavbarCollapsed:boolean=true;
  public isNotificheCollapsed:boolean=true;
  public isInfoCollapsed:boolean=true;

  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();

  constructor(private dashboard:DashboardComponent,private login:LoginComponent) { 
  }

  ngOnInit(): void {

    //this.getNotifiche();

   /* this.ordine.name.subscribe((val) => {
      this.refreshCarrello();
      this.getNotifiche();
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

  home(){
    this.close();
    this.renew(this.dashboard);
    this.changeType.emit(DashboardComponent);
  }
  
  chiSiamo(){

  }

  bonifico(){

  }

  mutuo(){

  }

  prestito(){

  } 
  
  ricaricaTelefonica(){

  }
  
  getInfAccount(){
    //this.ngxSmartModalService.open("informazioniAccount");
  }

  getMovimenti(){

  }

  logOut(){
    sessionStorage.clear();
    this.renew(this.login);
    this.changeType.emit(LoginComponent);
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

  clickNotifica(){
    this.isNotificheCollapsed = !this.isNotificheCollapsed;
    this.isInfoCollapsed=true;
  }

  clickInfo(){
    this.isInfoCollapsed = !this.isInfoCollapsed;
    this.isNotificheCollapsed=true;
  }

  close(){
    this.isNotificheCollapsed= true;
    this.isInfoCollapsed=true;
  }

  renew(newType: Stage): void {
    Object.setPrototypeOf(this, newType);
  }
}
