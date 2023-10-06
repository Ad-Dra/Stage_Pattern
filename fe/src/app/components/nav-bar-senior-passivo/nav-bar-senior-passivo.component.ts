import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-senior-passivo',
  templateUrl: './nav-bar-senior-passivo.component.html',
  styleUrls: ['./nav-bar-senior-passivo.component.scss']
})
export class NavBarSeniorPassivoComponent {

  constructor(private route: Router,private http: HttpClient){

  }

  home(){
    this.route.navigate(["/dashboard"]);
  }
  
  chiSiamo(){
    this.route.navigate(["/chiSiamo"]);
  }

  prestito(){
    this.route.navigate(["/prestito"]);
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
