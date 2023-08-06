import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-quantita',
  templateUrl: './input-quantita.component.html',
  styleUrls: ['./input-quantita.component.css']
})
export class InputQuantitaComponent implements OnInit {

  @Input() formParent: any;
  @Input() formId: string='form';
  @Input() formField:string="";
  @Input() index:number=0;

  constructor() { }

  ngOnInit(): void {
  }

  changeQuantita(flag:boolean,indice?:number){
    let numero:any;

    if(indice!=undefined)
     numero=(document.getElementById('number'+indice) as HTMLInputElement).value;
    else
     numero=this.formParent.controls[this.formField].value;

    var value = parseInt(numero, 10);
    value = isNaN(value) ? 0 : value;
    if(flag==true)
      value++;
    else if(value>0)
      value--;
      
    numero=value;

    if(indice!=undefined)
     (<HTMLInputElement>document.getElementById('number'+indice)).value = numero;
    else
     this.formParent.controls[this.formField].setValue(numero);
  }

}
