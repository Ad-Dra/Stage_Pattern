import { Component, OnInit } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ricarica-telefonica',
  templateUrl: './ricarica-telefonica.component.html',
  styleUrls: ['./ricarica-telefonica.component.scss']
})
export class RicaricaTelefonicaComponent implements Stage,OnInit{

  public form:FormGroup;
  public operatori:any=[];
  public importiRicarica:any=[];
  
  constructor(private fb:FormBuilder){
    this.form =  this.fb.group({
      numeroTelefono: [null,Validators.required],
      operatore:[null,Validators.required],
      importoRicarica: [null,Validators.required]
    });
  }

  ngOnInit(): void {
    this.operatori=[...this.operatori,{id:"wind",descrizione:"Wind3"}]
  }


  effettuaRicarica(){

  }

  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }
}
