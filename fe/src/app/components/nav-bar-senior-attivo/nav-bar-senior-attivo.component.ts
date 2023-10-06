import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-senior-attivo',
  templateUrl: './nav-bar-senior-attivo.component.html',
  styleUrls: ['./nav-bar-senior-attivo.component.scss']
})
export class NavBarSeniorAttivoComponent {

  constructor(private route: Router,private http: HttpClient){

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

  prestito(){
    this.route.navigate(["/prestito"]);
  }

  ricaricaTelefonica(){
    this.route.navigate(["/ricaricaTelefonica"]);
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
