import { Component, Input, OnInit } from '@angular/core';

export interface ColonneGridGroup {
  name:string,
  field:string,
  isCurrency:boolean,
  isQuantita:boolean,
  isDate:boolean
}

@Component({
  selector: 'app-grid-group',
  templateUrl: './grid-group.component.html',
  styleUrls: ['./grid-group.component.css']
})
export class GridGroupComponent implements OnInit {

  @Input() colonne:any=[];
  @Input() dati:any=[];
  private datiOriginali:any=[];

  constructor() { }

  ngOnInit(): void {
    this.datiOriginali=JSON.parse(JSON.stringify(this.dati));
  }

  onScroll(event: any) {
  }

  azione(tipoAzione:string,riga:any,index:any){
    if(tipoAzione=='moreData'){
      let indice=this.dati.indexOf(riga);
      indice++;

      let indiceOriginale=this.datiOriginali.findIndex((element: { idOrdine: any; })=> element.idOrdine==riga.idOrdine);
      indiceOriginale++;
      for(let i=indiceOriginale;i<this.datiOriginali.length;i++){
        if(this.datiOriginali[i].idOrdine)
          break;

        this.dati.splice(indice,0,this.datiOriginali[i])
        indice++;
      }

      (document.getElementById('plus'+index) as HTMLInputElement).style.visibility='hidden';
      (document.getElementById('minus'+index) as HTMLInputElement).style.visibility='visible';
    }
    else{
      let indice=this.dati.indexOf(riga);
      indice++;

      for(let i=indice;i<this.dati.length;i++){
        if(this.dati[i].idOrdine)
          break;

        this.dati.splice(i,1);
        i--;
      }
      (document.getElementById('minus'+index) as HTMLInputElement).style.visibility='hidden';
      (document.getElementById('plus'+index) as HTMLInputElement).style.visibility='visible';
    }
  }
}
