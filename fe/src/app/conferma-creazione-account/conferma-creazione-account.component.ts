import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conferma-creazione-account',
  templateUrl: './conferma-creazione-account.component.html',
  styleUrls: ['./conferma-creazione-account.component.scss']
})

export class ConfermaCreazioneAccountComponent{

  public username:string="";
  private token:string="";
  private email:string="";
  
  constructor(private locations: Location,private http:HttpClient, private router:Router){
    let url=location.hash.split("/");
    if(url.length>3){
      this.email=url[2];
      this.username=url[3];
      this.token=url[4]
    }
  }

  confermaAccount(flag:string){

    if(this.email && this.email!="" && this.token && this.token!=""){
      let parametri={
        email:this.email,
        utenzaAttiva: flag=="si" ? 1 : 0,
        token:this.token
      }

      this.http.post("/api/auth/aggiornaUtenza.json",parametri).subscribe(data=>{
        if(data){
          if(parametri.utenzaAttiva==1)
           this.router.navigate(["/login"]);
          else
            window.close();
        }
      });
    }
  }
}
