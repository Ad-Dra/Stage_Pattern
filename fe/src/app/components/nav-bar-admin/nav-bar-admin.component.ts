import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss']
})
export class NavBarAdminComponent {

  @Output() homeEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() getInfAccountEmitter: EventEmitter<any>= new EventEmitter<any>();
  @Output() logOutEmitter: EventEmitter<any>= new EventEmitter<any>();
  

  home(){
    this.homeEmitter.emit();
  }

  getInfAccount(){
    this.getInfAccountEmitter.emit();
  }

  logOut(){
    this.logOutEmitter.emit();
  }

}
