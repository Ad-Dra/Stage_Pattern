import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ripristina-credenziali',
  templateUrl: './ripristina-credenziali.component.html',
  styleUrls: ['./ripristina-credenziali.component.scss']
})
export class RipristinaCredenzialiComponent{
  public form:FormGroup;
  public formRipristinaPsw:FormGroup;
  public flagPswNonCorrisp:boolean=false;
  public ripristinaPasswordFlag:boolean=true;

  constructor(private locations: Location,private fb:FormBuilder,private http:HttpClient,private route: Router){
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
      if(res)
        this.indietro();
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
        token:url[3]
      }
  
      this.http.post("/api/auth/aggiornaPswUtenza.json",parametri).subscribe((response:any) => {
        if(response){
          this.indietro();
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

  indietro(){
    this.route.navigate(["/login"]);
  }
}
