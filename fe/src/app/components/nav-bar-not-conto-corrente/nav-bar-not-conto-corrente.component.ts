import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-not-conto-corrente',
  templateUrl: './nav-bar-not-conto-corrente.component.html',
  styleUrls: ['./nav-bar-not-conto-corrente.component.scss']
})
export class NavBarNotContoCorrenteComponent {

  constructor(private route: Router,private http:HttpClient){

  }

  home(){
    this.route.navigate(["/dashboard"]);
  }
  
  chiSiamo(){
    this.route.navigate(["/chiSiamo"]);
  }

  getInfAccount(){
    this.route.navigate(["/infoAccount"]);
  }

  logOut(){
    this.http.post("/api/logout.json",null).subscribe((res:any)=>{
      if(res){
        sessionStorage.clear();
        this.route.navigate(["/login"]);
      }
    });
  }
}
