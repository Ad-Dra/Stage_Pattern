import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ParserService } from '../parser/parserService';
import { ClienteJunior } from '../stage/cliente/clienteJunior';
import { ClienteSenior } from '../stage/cliente/clienteSenior';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss']
})
export class InfoAccountComponent implements OnInit{

  public formAnagrafica:FormGroup;
  public formUtente:FormGroup;
  
  constructor(private fb:FormBuilder,private http:HttpClient,private parserService:ParserService){
    this.formAnagrafica =  this.fb.group({
      cognome: [null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      nome: [null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      dataNascita:[null,Validators.required],
      via:[null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      comune:[null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      cap:[null,[Validators.required,Validators.pattern('[0-9]{1,5}')]],
      numCivico:[null,[Validators.required,Validators.pattern('[0-9]{1,5}')]],
      provincia:[null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]]
    });

    this.formUtente = this.fb.group({
      email: [null,[Validators.required,Validators.email]],
      username:[null,[Validators.required,Validators.pattern('^[a-z0-9_._-]*$')]]
    })
  }

  ngOnInit(): void {
    if(this.getRole()=='Admin')
      this.getInfoAccount();

    this.parserService.getCliente().subscribe((val) => {
      let cliente=val;

      if((cliente instanceof  ClienteJunior) ||  (cliente instanceof  ClienteSenior)){
        let anagrafica:any=cliente?.getAnagrafica();
        anagrafica.dataNascita=moment(anagrafica.dataNascita).format("YYYY-MM-DD");
        this.formUtente.patchValue(anagrafica);
        this.formAnagrafica.patchValue(anagrafica);
      }
    });
  }

  getInfoAccount(){
    this.http.get("/api/getinfoAccount.json").subscribe((res:any)=>{
      if(res && res.length>0){
        this.formUtente.patchValue(res[0]);
        this.formAnagrafica.patchValue(res[0]);
        this.formAnagrafica.controls["dataNascita"].setValue(moment(res[0].dataNascita).format("YYYY-MM-DD"));
      }
    })
  }

  modificaAccount(){
    if(!this.formAnagrafica.valid || !this.formUtente.valid)
      return;

    let dati={
      anagrafica:this.formAnagrafica.value,
      utente:this.formUtente.value,
    }

    this.http.post("/api/updateInfoAccount.json",dati).subscribe((res:any)=>{

    });
  }

  getRole(){
    if(sessionStorage.getItem("token")){
      let token:any=sessionStorage.getItem("token")?.split('.')[1];
      return JSON.parse(atob(token)).ruolo;
    }
  }
}
