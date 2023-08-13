import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-crea-conto-corrente-cliente',
  templateUrl: './crea-conto-corrente-cliente.component.html',
  styleUrls: ['./crea-conto-corrente-cliente.component.scss']
})
export class CreaContoCorrenteClienteComponent {

  private dati:any;
  public form:any;

  constructor(private http:HttpClient,private fb:FormBuilder,public ngxSmartModalService: NgxSmartModalService){
    this.form =  this.fb.group({
      iban: [null,[Validators.required,Validators.minLength(27)]],
      descrizione: [null,null],
      email: [null,null],
      idUtente: [null,null]
    });
  }

  onDataLoaded(){
    this.form.reset();
    this.dati=this.ngxSmartModalService.getModalData("creaContoCorrente");
  }

  createContoCorrente(){
    if(!this.form.valid)
      return;

    this.form.patchValue(this.dati);

    this.http.post("/api/admin/creaContoCorrente.json",this.form.value).subscribe((res:any)=>{
      if(res)
        this.onClose();
    });
  }

  onClose(){
    this.ngxSmartModalService.close("creaContoCorrente");
  }
}
