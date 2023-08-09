import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Stage } from '../stage/stage';
import { HttpClient } from '@angular/common/http';
import { COMPONENT_B_TOKEN } from '../app.module';
import { LoginComponent } from '../login/login.component';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-conferma-creazione-account',
  templateUrl: './conferma-creazione-account.component.html',
  styleUrls: ['./conferma-creazione-account.component.scss']
})
export class ConfermaCreazioneAccountComponent implements Stage{

  public username:string="";
  private token:string="";
  private email:string="";

  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private locations: Location,private http:HttpClient,@Inject(COMPONENT_B_TOKEN)private login:LoginComponent){
    if(location.hash.includes('#/confermaEmail')){
      let url=location.hash.split("/");
      if(url.length>3){
        this.email=url[2];
        this.username=url[3];
        this.token=url[4]
      }
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
          if(parametri.utenzaAttiva==1){
            this.locations.replaceState("");
            this.renew(this.login);
            this.changeType.emit(LoginComponent);
          }
          else{
            window.close();
          }
        }
      });
    }
  }

  renew(newType: Stage): void {
    Object.setPrototypeOf(this, newType);
  }
}
