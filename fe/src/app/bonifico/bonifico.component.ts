import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrls: ['./bonifico.component.scss']
})
export class BonificoComponent implements OnInit{

  @Input() contiCorrente:any;
  @Output() refreshDash: EventEmitter<any>= new EventEmitter<any>();

  public form:FormGroup;
  public tipologieBonfico:any=[];
 
  constructor(private fb:FormBuilder,private http:HttpClient){
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
    if(this.contiCorrente.length==1)
      this.form.controls["idContoCorrente"].setValue(this.contiCorrente[0].idContoCorrente);

    if(!this.form.valid)
      return;

    this.http.post("/api/creaBonifico.json",this.form.value).subscribe((res:any)=>{
      if(res)
        this.refreshDash.emit();
    })
  }
}
