import { Component, OnInit } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ricarica-telefonica',
  templateUrl: './ricarica-telefonica.component.html',
  styleUrls: ['./ricarica-telefonica.component.scss']
})
export class RicaricaTelefonicaComponent implements Stage,OnInit{

  public form:FormGroup;
  public operatori:any=[];
  public importiRicarica:any=[];
  
  constructor(private fb:FormBuilder,private http:HttpClient){
    this.form =  this.fb.group({
      numeroTelefono: [null,Validators.required],
      operatore:[null,Validators.required],
      importoRicarica: [null,Validators.required]
    });
  }

  ngOnInit(): void {
    this.getDdlOperatori();
  }

  getDdlOperatori(){
    this.http.get("/api/getOperatori.json").subscribe((res:any)=>{
      if(res)
        this.operatori=res;
    })
  }

  getDdlImporti(ev:any){
    this.http.get("/api/getImporti/"+ev.idOperatore+".json").subscribe((res:any)=>{
      if(res)
        this.importiRicarica=res;
    });
  }

  effettuaRicarica(){
    if(!this.form.valid)
      return;

    this.http.post("/api/creaRicaricaTelefonica.json",null).subscribe((res:any)=>{

    });
  }

  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }
}
