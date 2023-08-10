import { Component, OnInit } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrls: ['./bonifico.component.scss']
})
export class BonificoComponent implements Stage,OnInit{

  public form:FormGroup;
  public tipologieBonfico:any=[];
  
  constructor(private fb:FormBuilder,private http:HttpClient){
    this.form =  this.fb.group({
      beneficiario: [null,Validators.required],
      ibanBeneficiario:[null,Validators.required],
      tipologiaBonifico: [null,Validators.required],
      causale: [null,Validators.required],
      importo:[null,Validators.required]
    });
  }

  ngOnInit(): void {
    this.getDdlTipologieBonifici();
  }

  getDdlTipologieBonifici(){
    this.http.get("/api/getTipiBonifico.json").subscribe((res:any)=>{
      if(res)
        this.tipologieBonfico=res;
    })
  }

  effettuaIlBonifico(){

  }


  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }
}
