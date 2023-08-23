import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ricarica-telefonica',
  templateUrl: './ricarica-telefonica.component.html',
  styleUrls: ['./ricarica-telefonica.component.scss']
})
export class RicaricaTelefonicaComponent implements Stage,OnInit{

   
  @Input() contiCorrente:any;
  @Input() dashboard:any;
  @Input() dashboardSaldPass:any;
  @Input() notContoCorrenteDashboard:any;

  public form:FormGroup;
  public operatori:any=[];
  public importiRicarica:any=[];
  
  
  @Input() dashboardSaldoPassivo:any;
  
  constructor(private fb:FormBuilder,private http:HttpClient){
    this.form =  this.fb.group({
      numeroTelefono: [null,Validators.required],
      operatore:[null,Validators.required],
      importo: [null,Validators.required],
      idContoCorrente:[null,Validators.required],
      beneficiario:[null,null]
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

    if(this.contiCorrente.length==1){
      this.form.controls["idContoCorrente"].setValue(this.contiCorrente[0].idContoCorrente);
    }

    if(this.operatori){
      let index=this.operatori.findIndex((el:any)=>el.idOperatore==this.form.controls["operatore"].value)
      this.form.controls["beneficiario"].setValue(this.operatori[index].descrizione);
    }

    this.http.post("/api/creaRicaricaTelefonica.json",this.form.value).subscribe((res:any)=>{
      if(res){
        this.getInfoContoCorrente();
      }
    });
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

  onSelectOperatore(ev:any){
    if(!ev)
      this.form.controls['importo'].setValue(null);
  }

  renew(newType: Stage): void {
    Object.setPrototypeOf(this, newType);
  }
}
