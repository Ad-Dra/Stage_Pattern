import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParserService } from '../parser/parserService';
import { ClienteJunior } from '../stage/cliente/clienteJunior';
import { ClienteSenior } from '../stage/cliente/clienteSenior';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestito',
  templateUrl: './prestito.component.html',
  styleUrls: ['./prestito.component.scss']
})
export class PrestitoComponent implements OnInit{

  public cc:any=[];
  public form:FormGroup;
  
  constructor(private fb:FormBuilder,private http:HttpClient, private parserService: ParserService,public route:Router){
    this.form =  this.fb.group({
      importo: [null,Validators.required],
      idContoCorrente:[null, Validators.required],
      ibanBeneficiario:[null, Validators.required],
      beneficiario:[null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.parserService.getCliente().subscribe((val) => {
      let cliente=val;
      
      if((cliente instanceof  ClienteJunior) ||  (cliente instanceof  ClienteSenior))
        this.cc=cliente?.getContiCorrenti();
    });
  }

  richiediPrestito(){

    if(this.cc.length==1){
      this.form.controls["idContoCorrente"].setValue(this.cc[0].idContoCorrente);
      this.form.controls["ibanBeneficiario"].setValue(this.cc[0].iban);
      this.form.controls["beneficiario"].setValue(this.cc[0].idContoCorrente);
    }
    else if(this.cc.length>1){
      let index=this.cc.findIndex((el:any)=>el.idContoCorrente==this.form.controls["idContoCorrente"].value);
      this.form.controls["ibanBeneficiario"].setValue(this.cc[index].iban);
      this.form.controls["beneficiario"].setValue(this.cc[index].idContoCorrente);
    }

    if(!this.form.valid)
      return;

    if(this.cc.length==1)
      this.cc[0].prestito(this.form.value,this.http,this.route);
    else
      this.cc[this.indiceCc(this.form.controls["idContoCorrente"].value)].prestito(this.form.value,this.http,this.route);
  }

  indiceCc(idContoCorrente:number){
    return this.cc.findIndex( (x:any) => x.idContoCorrente == idContoCorrente);
  }
}
