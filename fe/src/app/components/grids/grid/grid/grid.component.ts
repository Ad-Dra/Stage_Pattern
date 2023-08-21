import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Colonne {
  name:string,
  field:string,
  isCurrency:boolean,
  isDate:boolean,
  persIcon:boolean,
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit {

  @Input() colonne:any=[];
  @Input() dati:any=[];
  @Input() notShowButton:boolean=false;
  @Input() showAggiungi:boolean=true;
  @Input() showModifica:boolean=true;
  @Input() showElimina:boolean=true;
  @Output() action = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  azione(riga:any,tipoAzione:string,index:number){
    riga.tipoAzione=tipoAzione;
    riga.index=index;
    this.action.emit(riga);
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    console.log("scrool",event.target.offsetHeight + event.target.scrollTop)
   /* if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight-10) {
      console.log("End");
      this.offset+=this.rowForPage;
      this.service.get("getCarrelloUtente.json/"+this.offset+"/"+this.rowForPage).subscribe(
        response => {
          for(let i=0;i<response.elementList.length;i++)
            this.riepilogoOrdine.push(response.elementList[i]);
            
          this.responseOk=true;
        },
        error => {

      });
    }*/
  }
}
