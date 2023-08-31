import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss']
})
export class InfoAccountComponent implements OnInit{

  public form:FormGroup;
  
  constructor(private fb:FormBuilder,private http:HttpClient){
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
    });
  }

  ngOnInit(): void {
    this.getInfoAccount();
  }

  getInfoAccount(){
    this.http.get("/api/getinfoAccount.json").subscribe((res:any)=>{
      if(res && res.length>0){
        this.form.patchValue(res[0]);
        this.form.controls["dataNascita"].setValue(moment(res[0].dataNascita).format("YYYY-MM-DD"));
      }
    })
  }

  modificaAccount(){

  }

  /*renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }*/ 
}
