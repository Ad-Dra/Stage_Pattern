import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ParserService } from '../parser/parserService';
import { ClienteJunior } from '../stage/cliente/clienteJunior';
import { ClienteSenior } from '../stage/cliente/clienteSenior';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ricarica-telefonica',
  templateUrl: './ricarica-telefonica.component.html',
  styleUrls: ['./ricarica-telefonica.component.scss']
})
export class RicaricaTelefonicaComponent implements OnInit{
  
  public cc:any=[];
  public form:FormGroup;
  public operatori:any=[];
  public importiRicarica:any=[];
  
  constructor(private fb:FormBuilder,private http:HttpClient, private parserService:ParserService,public route:Router){
    this.form =  this.fb.group({
      numeroTelefono: [null,Validators.required],
      operatore:[null,Validators.required],
      importo: [null,Validators.required],
      idContoCorrente:[null,Validators.required],
      beneficiario:[null,null]
    });
  }

  ngOnInit(): void {

    this.parserService.getCliente().subscribe((val) => {
      let cliente=val;
      
      if((cliente instanceof  ClienteJunior) ||  (cliente instanceof  ClienteSenior))
        this.cc=cliente?.getContiCorrenti();
    });

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

    if(this.cc.length==1)
      this.form.controls["idContoCorrente"].setValue(this.cc[0].idContoCorrente);

    if(!this.form.valid)
      return;

    if(this.operatori){
      let index=this.operatori.findIndex((el:any)=>el.idOperatore==this.form.controls["operatore"].value)
      this.form.controls["beneficiario"].setValue(this.operatori[index].descrizione);
    }

    if(this.cc.length==1)
      this.cc[0].ricaricaTelefonica(this.form.value,this.http,this.route);
    else
      this.cc[this.indiceCc(this.form.controls["idContoCorrente"].value)].ricaricaTelefonica(this.form.value,this.http,this.route);
  }

  indiceCc(idContoCorrente:number){
    return this.cc.findIndex( (x:any) => x.idContoCorrente == idContoCorrente);
  }

  onSelectOperatore(ev:any){
    this.form.controls['importo'].setValue(null);
  }
}
