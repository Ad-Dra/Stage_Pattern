import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crea-utenza',
  templateUrl: './crea-utenza.component.html',
  styleUrls: ['./crea-utenza.component.scss']
})
export class CreaUtenzaComponent{

  public form:any;

  constructor(private http:HttpClient,private fb:FormBuilder, private router: Router) { 
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
      provincia:[null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]]
    });
  }

  creaAccount(){
    if(!this.form.valid)
      return;

    this.http.post("/api/auth/createUtenza.json",this.form.value).subscribe(data => {
      if(data)
        this.indietro();
    });
  }

  indietro(){
    this.router.navigate(["/login"]);
  }
}
