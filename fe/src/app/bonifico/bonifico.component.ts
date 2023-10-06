import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ParserService } from '../parser/parserService';
import { ContoCorrenteAttivo } from '../stage/contoCorrente/contoCorrenteAttivo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrls: ['./bonifico.component.scss']
})
export class BonificoComponent implements OnInit{

 // @Input() contiCorrente:any;
  //@Output() refreshDash: EventEmitter<any>= new EventEmitter<any>();

  public form:FormGroup;
  public tipologieBonfico:any=[];
  public cc:any;

 
  constructor(private fb:FormBuilder,private http:HttpClient,private parserService:ParserService,private route: Router){
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
    this.parserService.getCliente().subscribe((val) => {
      let cliente=val;
      this.cc=cliente?.getContiCorrenti();
    });

    this.getDdlTipologieBonifici();
  }

  getDdlTipologieBonifici(){
    this.http.get("/api/getTipiBonifico.json").subscribe((res:any)=>{
      if(res)
        this.tipologieBonfico=res;
    })
  }

  effettuaIlBonifico(){
    if(this.cc.length==1)
      this.form.controls["idContoCorrente"].setValue(this.cc[0].getIdContoCorrente());

    if(!this.form.valid)
      return;

    if(this.cc.length==1)
      this.cc[0].bonifico(this.form.value,this.http,this.route);
    else
      this.cc[this.indiceCc(this.form.controls["idContoCorrente"].value)].bonifico(this.form.value,this.http,this.route);
  }

  indiceCc(idContoCorrente:number){
    return this.cc.findIndex( (x:any) => x.idContoCorrente == idContoCorrente);
  }
}
