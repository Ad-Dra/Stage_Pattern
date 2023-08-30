import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotifierService } from 'angular-notifier';
import { RipristinaCredenzialiComponent } from '../ripristina-credenziali/ripristina-credenziali.component';
import { CreaUtenzaComponent } from '../crea-utenza/crea-utenza.component';
import { DashboardAdminComponent } from '../dashboard-admin/dashboard-admin.component';
import { Utente } from '../stage/utente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Utente{
  
  public loginForm:FormGroup;
  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private notifier: NotifierService,private fb:FormBuilder,private http:HttpClient,private dashboard:DashboardComponent,private ripristinaCred:RipristinaCredenzialiComponent,private creaUtenza:CreaUtenzaComponent,private dashboardAdmin:DashboardAdminComponent){
    super();

    this.loginForm =  this.fb.group({
      identificativo: [null,Validators.required],
      password: [null,Validators.required]
    });
    //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'
  }

  login(){
    if(!this.loginForm.valid)
      return;    

    this.http.post("/api/login.json",this.loginForm.value).subscribe((res:any)=>{
      if(res){
        sessionStorage.setItem("token",res.token);
        if(this.getRole()!="Admin"){
          this.renew(this,this.dashboard);
          this.changeType.emit({comp:DashboardComponent});
        }
        else{
          this.renew(this,this.dashboardAdmin);
          this.changeType.emit({comp:DashboardAdminComponent});
        }
      }
    })
  }

  getRole(){
    if(sessionStorage.getItem("token")){
      let token:any=sessionStorage.getItem("token")?.split('.')[1];
      return JSON.parse(atob(token)).ruolo;
    }
  }

  ripristinaPassword(){
    this.renew(this,this.ripristinaCred);
    this.changeType.emit({comp:RipristinaCredenzialiComponent});
  }

  creaAccount(){
    this.renew(this,this.creaUtenza);
    this.changeType.emit({comp:CreaUtenzaComponent});
  }
}
