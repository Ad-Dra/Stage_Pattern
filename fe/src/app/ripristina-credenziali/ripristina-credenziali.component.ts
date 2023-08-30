import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import {Location} from '@angular/common'; 
import { COMPONENT_B_TOKEN } from '../app.module';
import { Utente } from '../stage/utente';

@Component({
  selector: 'app-ripristina-credenziali',
  templateUrl: './ripristina-credenziali.component.html',
  styleUrls: ['./ripristina-credenziali.component.scss']
})
export class RipristinaCredenzialiComponent extends Utente{
  public form:FormGroup;
  public formRipristinaPsw:FormGroup;
  public flagPswNonCorrisp:boolean=false;
  public ripristinaPasswordFlag:boolean=true;

  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();

  constructor(private locations: Location,private fb:FormBuilder,private http:HttpClient,@Inject(COMPONENT_B_TOKEN)private login:LoginComponent){
    super();

    this.form =  this.fb.group({
      email: [null,[Validators.required,Validators.email]]
    });

    this.formRipristinaPsw =  this.fb.group({
      password: [null,[Validators.required]],
      passwordConferma: [null,[Validators.required]]
    });

    if(location.hash.includes('#/ripristinaPassword'))
      this.ripristinaPasswordFlag=false;
  }

  inviaEmail(){
    if(!this.form.valid)
      return;    

    this.http.post("/api/auth/ripristinaPassword.json",this.form.value).subscribe((res:any)=>{
      if(res){
        this.renew(this,this.login);
        this.changeType.emit({comp:LoginComponent});
      }
    })
  }

  ripristinaPassword(){
    if(!this.formRipristinaPsw.valid)
      return;    

    let url=location.hash.split("/");

    if(url.length>3){
      let parametri={
        email:url[2],
        passwordUtente:this.formRipristinaPsw.value.password,
        token:url[3],
        flag: 1
      }
  
      this.http.post("/api/auth/aggiornaUtenza.json",parametri).subscribe((response:any) => {
        if(response){
          this.locations.replaceState("");
          this.renew(this,this.login);
          this.changeType.emit({comp:LoginComponent});
        }
      });
    }
  }

  changePswConferma(input:any){
    if(input.target.value!=this.formRipristinaPsw.value.password){
      this.flagPswNonCorrisp=true;
      this.formRipristinaPsw.controls['passwordConferma'].setErrors({'invalid': true});
    }else
      this.flagPswNonCorrisp=false;
  }
}
