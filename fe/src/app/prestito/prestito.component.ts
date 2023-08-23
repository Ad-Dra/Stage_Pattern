import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prestito',
  templateUrl: './prestito.component.html',
  styleUrls: ['./prestito.component.scss']
})
export class PrestitoComponent {

  @Input() contiCorrente:any;
  @Input() dashboard:any;
  @Input() dashboardSaldAtt:any;
  
  public form:FormGroup;
  
  constructor(private fb:FormBuilder,private http:HttpClient){
    this.form =  this.fb.group({
      importo: [null,Validators.required],
      idContoCorrente:[null, Validators.required],
      ibanBeneficiario:[null, Validators.required],
      beneficiario:[null, Validators.required]
    });
  }


  richiediPrestito(){

    if(this.contiCorrente.length==1){
      this.form.controls["idContoCorrente"].setValue(this.contiCorrente[0].idContoCorrente);
      this.form.controls["ibanBeneficiario"].setValue(this.contiCorrente[0].iban);
      this.form.controls["beneficiario"].setValue(this.contiCorrente[0].username);
    }
    else if(this.contiCorrente.length>1){
      let index=this.contiCorrente.findIndex((el:any)=>el.idContoCorrente==this.form.controls["idContoCorrente"].value);
      this.form.controls["ibanBeneficiario"].setValue(this.contiCorrente[index].iban);
      this.form.controls["beneficiario"].setValue(this.contiCorrente[index].username);
    }

    if(!this.form.valid)
      return;

    this.http.post("/api/richiediPrestito.json",this.form.value).subscribe((res:any)=>{
      if(res)
        this.getInfoContoCorrente();
    });
  }

  getInfoContoCorrente(): void{
    this.http.get("/api/getInfoContoCorrente.json").subscribe((res:any)=>{
      if(res){
        this.contiCorrente=res;
        this.dashboard.contiCorrente=this.contiCorrente;
        this.dashboard.home();
        
        if(this.contiCorrente.length==1 && this.contiCorrente[0].saldo>0){
          this.dashboard.renew(this.dashboardSaldAtt)
        }
        else{
         
          for(let i=0;i<this.contiCorrente.length;i++){
            if(this.contiCorrente[i].saldo>0){
              this.dashboard.renew(this.dashboardSaldAtt)
              break;
            }
          }
        }
      }
    })
  }
}
