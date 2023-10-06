import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-junior-attivo',
  templateUrl: './nav-bar-junior-attivo.component.html',
  styleUrls: ['./nav-bar-junior-attivo.component.scss']
})
export class NavBarJuniorAttivoComponent {

  constructor(private route: Router,private http:HttpClient){

  }

  home(){
    this.route.navigate(["/dashboard"]);
  }
  
  chiSiamo(){
    this.route.navigate(["/chiSiamo"]);
  }

  bonifico(){
    this.route.navigate(["/bonifico"]);
  }
  
  getInfAccount(){
    this.route.navigate(["/infoAccount"]);
  }

  getMovimenti(){
    this.route.navigate(["/movimenti"]);
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
