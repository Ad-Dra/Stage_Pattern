import { Component, Input, OnInit } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrls: ['./bonifico.component.scss']
})
export class BonificoComponent implements Stage,OnInit{

  @Input() contiCorrente:any;
  
  public form:FormGroup;
  public tipologieBonfico:any=[];

  
  constructor(private fb:FormBuilder,private http:HttpClient){
    this.form =  this.fb.group({
      beneficiario: [null,Validators.required],
      ibanBeneficiario:[null,Validators.required],
      tipologiaBonifico: [null,Validators.required],
      causale: [null,Validators.required],
      importo:[null,Validators.required],
      idContoCorrente:[null,Validators.required],
      saldo:[null,Validators.required]
    });
  }

  ngOnInit(): void {
    this.getDdlTipologieBonifici();

    if(this.contiCorrente.length==1){
      this.form.controls["idContoCorrente"].setValue(this.contiCorrente[0].idContoCorrente);
      this.form.controls["saldo"].setValue(this.contiCorrente[0].saldo);
    }
  }

  getDdlTipologieBonifici(){
    this.http.get("/api/getTipiBonifico.json").subscribe((res:any)=>{
      if(res)
        this.tipologieBonfico=res;
    })
  }

  effettuaIlBonifico(){
    
    if(this.contiCorrente.length>1 && this.form.controls["idContoCorrente"].value){
      let index=this.contiCorrente.findIndex((el:any)=>el.idContoCorrente==this.form.controls["idContoCorrente"].value)
      this.form.controls["saldo"].setValue(this.contiCorrente[index].saldo);
    }

    if(!this.form.valid)
      return;

    

    this.http.post("/api/creaBonifico.json",this.form.value).subscribe((res:any)=>{
      if(res)
        console.log(res);
    })
  }


  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }
}
