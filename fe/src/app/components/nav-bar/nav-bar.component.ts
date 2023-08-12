import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public notifiche:any=[];
  public numNotifiche:number=0;

  @Output() homeEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() chiSiamoEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() getInfAccountEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() getMovimentiEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() logOutEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() bonificoEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() ricaricaTelefonicaEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() prestitoEmitter: EventEmitter<any>= new EventEmitter<any>();
  
  constructor() { 
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
    this.homeEmitter.emit();
  }
  
  chiSiamo(){
    this.chiSiamoEmitter.emit();
  }

  bonifico(){
    this.bonificoEmitter.emit();
  }

  prestito(){
    this.prestitoEmitter.emit();
  } 
  
  ricaricaTelefonica(){
    this.ricaricaTelefonicaEmitter.emit();
  }
  
  getInfAccount(){
    this.getInfAccountEmitter.emit();
  }

  getMovimenti(){
    this.getMovimentiEmitter.emit();
  }

  logOut(){
    this.logOutEmitter.emit();
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
