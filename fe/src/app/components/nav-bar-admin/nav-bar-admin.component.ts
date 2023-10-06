import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss']
})
export class NavBarAdminComponent {
  
  constructor(private route: Router){

  }

  home(){
    this.route.navigate(["/dashboardAdmin"]);
  }

  getInfAccount(){
    this.route.navigate(["/infoAccount"]);
  }

  logOut(){
    sessionStorage.clear();
    this.route.navigate(["/login"]);
  }
}
