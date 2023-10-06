import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  
  public loginForm:FormGroup;
  
  constructor(private route: Router,private notifier: NotifierService,private fb:FormBuilder,private http:HttpClient){

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
        
        if(this.getRole()!="Admin")
          this.route.navigate(["/dashboard"]);
        else
          this.route.navigate(["/dashboardAdmin"]);
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
    this.route.navigate(["/ripristinaCredenziali"]);
  }

  creaAccount(){
    this.route.navigate(["/creaAccount"]);
  }
}
