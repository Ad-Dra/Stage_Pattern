import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Stage } from '../stage/stage';
import { COMPONENT_B_TOKEN } from '../app.module';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-crea-utenza',
  templateUrl: './crea-utenza.component.html',
  styleUrls: ['./crea-utenza.component.scss']
})
export class CreaUtenzaComponent implements Stage{

  public form:any;
  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();

  constructor(private http:HttpClient,private fb:FormBuilder,@Inject(COMPONENT_B_TOKEN)private login:LoginComponent) { 
    this.form =  this.fb.group({
      cognome: [null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      nome: [null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      dataNascita:[null,Validators.required],
     
      email: [null,[Validators.required,Validators.email]],
      username:[null,[Validators.required,Validators.pattern('^[a-z0-9_._-]*$')]],
      passwordUtente:[null,Validators.required],

      via:[null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      comune:[null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      cap:[null,[Validators.required,Validators.pattern('[0-9]{1,5}')]],
      numCivico:[null,[Validators.required,Validators.pattern('[0-9]{1,5}')]],
      provincia:[null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      //cellulare:[null,[Validators.required,Validators.pattern('[0-9]{1,10}')]],
    });
  }

  creaAccount(){
    if(!this.form.valid)
      return;

    this.http.post("/api/auth/createUtenza.json",this.form.value).subscribe(data => {
      if(data){
        this.renew(this.login);
        this.changeType.emit(LoginComponent);
      }
    });
  }

  renew(newType: Stage): void {
    Object.setPrototypeOf(this, newType);
  }
}
