import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/components/configService/config.service';


@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})

export class InputTextComponent implements OnInit {

  @Input() formParent: any;
  @Input() value?: any;
  @Input() formId: string='form';
  @Input() formField:string="";
  @Input() title: string="";
  @Input() readonly:boolean=false;
  @Input() required:boolean=false;
  @Input() maxLen:string='';
  @Input() minLen:string='';
  @Input() type:string='text';
  @Output() action: EventEmitter<any>= new EventEmitter<any>();

  public titolo:string="";

  public submitted:boolean=false;

  constructor(public conf:ConfigService) { 
  }

  ngOnInit(): void {
    let form=document.getElementById(this.formId);

    if(this.required==true)
      this.titolo=this.conf.getLable(this.title)+'*';
    else
      this.titolo=this.conf.getLable(this.title);

    form?.addEventListener('build', (()=>{
      this.submitted=true;
    }),false)
    
    this.formParent.valueChanges.subscribe(()=>{
      this.submitted=true;
    })
  }

  change(ev:any){
    this.action.emit(ev);
  }

  changeItem(ev:any){
    this.action.emit(ev);
  }

  formatValue(){
    if(this.formParent.controls[this.formField].value!=null)
      this.formParent.controls[this.formField].setValue(this.checkImporto( this.formParent.controls[this.formField].value));
  }

  checkImporto(valore: string) {
    var res;

    valore = this.sanitizeImporto(valore);
    if (valore == "0" || valore == "")
        res = "";
    else
        res = this.formattaImporto(parseInt(valore).toString());

    return res;
  }

  sanitizeImporto(importo: string) {
    importo = importo.toString();
    importo = importo.replace(',', '');
    importo = importo.replace(/\./g, '');
    importo = importo.replace(/\D+/g, '');

    if (importo.length > 15)
        importo = importo.substring(0, 15);

    return importo;
  }

  formattaImporto(importo: string) {
    var decimale = "";
    var intero = "";
    var y = "";
    if (importo.length == 0)
        return "";
    else if (importo.length == 1)
        return ("0,0" + importo);
    else if (importo.length == 2)
        return ("0," + importo);
    else if (importo.length > 2) {
        decimale = importo.substring(importo.length - 2);
        intero = importo.substring(0, importo.length - 2);
        if (intero.length > 3) {
            if (intero.length % 3 != 0)
                y = intero.substring(0, intero.length % 3);

            let arr :any = intero.substring(intero.length % 3).match(/.{1,3}/g);

            intero = "";
            arr.forEach(function (item:any) {
                intero = intero + item + ".";
            });

            intero = intero.substring(0, intero.length - 1);
        }
    }
    return (y ? (y + ".") : "") + intero + "," + decimale;
  }
}
