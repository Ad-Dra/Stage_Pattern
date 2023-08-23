import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrls: ['./bonifico.component.scss']
})
export class BonificoComponent implements Stage,OnInit{

  
  @Input() contiCorrente:any;
  @Input() dashboard:any;
  @Input() dashboardSaldPass:any;
  @Input() notContoCorrenteDashboard:any;

  public form:FormGroup;
  public tipologieBonfico:any=[];

  
  constructor(private fb:FormBuilder,private http:HttpClient,private dash:DashboardComponent){
    this.form =  this.fb.group({
      beneficiario: [null,Validators.required],
      ibanBeneficiario:[null,Validators.required],
      tipologiaBonifico: [null,Validators.required],
      causale: [null,Validators.required],
      importo:[null,Validators.required],
      idContoCorrente:[null,Validators.required]
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
    
    /*if(this.contiCorrente.length>1 && this.form.controls["idContoCorrente"].value){
      let index=this.contiCorrente.findIndex((el:any)=>el.idContoCorrente==this.form.controls["idContoCorrente"].value)
      this.form.controls["saldo"].setValue(this.contiCorrente[index].saldo);
    }*/

    if(this.contiCorrente.length==1){
      this.form.controls["idContoCorrente"].setValue(this.contiCorrente[0].idContoCorrente);
      //this.form.controls["saldo"].setValue(this.contiCorrente[0].saldo);
    }

    if(!this.form.valid)
      return;

    

    this.http.post("/api/creaBonifico.json",this.form.value).subscribe((res:any)=>{
      if(res){
        this.getInfoContoCorrente();
      }
    })
  }

  getInfoContoCorrente(): void{
    this.http.get("/api/getInfoContoCorrente.json").subscribe((res:any)=>{
      if(res){
        this.contiCorrente=res;
        this.dashboard.contiCorrente=this.contiCorrente;
        this.dashboard.home();

        if(this.contiCorrente.length==0)
          this.dashboard.renew(this.notContoCorrenteDashboard);
        else if(this.contiCorrente.length==1 && this.contiCorrente[0].saldo==0.0){
          this.dashboard.renew(this.dashboardSaldPass)
        }
        else{
          let haveMoney:boolean=false;

          for(let i=0;i<this.contiCorrente.length;i++){
            if(this.contiCorrente[i].saldo>0){
              haveMoney=true;
              break;
            }
          }

          if(!haveMoney){
            this.dashboard.renew(this.dashboardSaldPass)
          }

        }
      }
    })
  }


  renew(newType: Stage): void {
    Object.setPrototypeOf(this, newType);
  }
}
