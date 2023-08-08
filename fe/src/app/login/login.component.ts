import { Component, EventEmitter, Output } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotifierService } from 'angular-notifier';
import { RipristinaCredenzialiComponent } from '../ripristina-credenziali/ripristina-credenziali.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements Stage{
  
  public loginForm:FormGroup;
  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private notifier: NotifierService,private fb:FormBuilder,private http:HttpClient,private dashboard:DashboardComponent,private ripristinaCred:RipristinaCredenzialiComponent){
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
        this.renew(this.dashboard);
        this.changeType.emit(DashboardComponent);
      }
    })
  }

  renew(newType: Stage): void {
    Object.setPrototypeOf(this, newType);
  }

  ripristinaPassword(){
    this.renew(this.ripristinaCred);
    this.changeType.emit(RipristinaCredenzialiComponent);
  }

  creaAccount(){
  }
}
