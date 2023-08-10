import { Component } from '@angular/core';
import { Stage } from '../stage/stage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bonifico',
  templateUrl: './bonifico.component.html',
  styleUrls: ['./bonifico.component.scss']
})
export class BonificoComponent implements Stage{

  public form:FormGroup;
  public tipologieBonfico:any=[];
  
  constructor(private fb:FormBuilder){
    this.form =  this.fb.group({
      beneficiario: [null,Validators.required],
      ibanBeneficiario:[null,Validators.required],
      tipologiaBonifico: [null,Validators.required],
      causale: [null,Validators.required],
      importo:[null,Validators.required]
    });
  }


  effettuaIlBonifico(){

  }


  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }
}
