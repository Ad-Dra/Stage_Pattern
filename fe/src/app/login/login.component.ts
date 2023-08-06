import { Component, EventEmitter, Output } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements Stage{
  
  public loginForm:FormGroup;
  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private notifier: NotifierService,private fb:FormBuilder,private http:HttpClient,private dashboard:DashboardComponent){
    this.loginForm =  this.fb.group({
      identificativo: [null,Validators.required],
      password: [null,[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  login(){
    //if(!this.loginForm.valid)
      //return;    
      this.notifier.notify("success", "ciao" );
    //this.http.post("login.json",this.loginForm.value).subscribe((res)=>{
      //if(res)
        //this.renew(this.dashboard);
       // this.changeType.emit(DashboardComponent);
    //})
  }

  renew(newType: Stage): void {
    Object.setPrototypeOf(this, newType);
  }

  ripristinaPassword(){

  }

  creaAccount(){
  }
}
