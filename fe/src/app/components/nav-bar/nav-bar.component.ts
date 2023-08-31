import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() stateUtente:string="";

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
}
