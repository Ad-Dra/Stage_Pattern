import { Component } from '@angular/core';
import { ClienteJunior } from '../stage/cliente/clienteJunior';
import { ClienteSenior } from '../stage/cliente/clienteSenior';
import { ParserService } from '../parser/parserService';
import { Colonne } from '../components/grids/grid/grid/grid.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public cliente:ClienteJunior | ClienteSenior | undefined;
  public cc:any;
  public anagrafica:any;

  public colonne:Colonne []=[
    {name:"Descrizione conto", field:'descrizione',isCurrency:false,isDate:false, persIcon:false},
    {name:"Saldo", field:'saldo',isCurrency:true,isDate:false, persIcon:false},
    {name:"Data creazione", field:'dataCreazione',isCurrency:false,isDate:true, persIcon:false}
  ]

  constructor(private parserService: ParserService){

  }
  
  ngOnInit(): void {
    this.parserService.getCliente().subscribe((val) => {
      this.cliente=val;

      if((this.cliente instanceof  ClienteJunior) ||  (this.cliente instanceof  ClienteSenior)){
        this.cc=this.cliente?.getContiCorrenti();
        this.anagrafica=this.cliente?.getAnagrafica();
      }
    });
  }
}
