import { Component, OnInit } from '@angular/core';
import { ParserService } from './parser/parserService';
import { ClienteJunior } from './stage/cliente/clienteJunior';
import { ClienteSenior } from './stage/cliente/clienteSenior';
import { NavigationEnd, Router } from '@angular/router';
import { ParserComponent } from './parser/parser.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Stage_Pattern';
  public type:string='';

  constructor(private route: Router,private parserService: ParserService,private router: Router,private parser:ParserComponent,private http:HttpClient){
    router.events.subscribe((event:  any) => {
      if (event instanceof NavigationEnd) {
        if(sessionStorage.getItem("token") && this.getRole()=='Admin' && location.hash!='#/login' && location.hash!='#/confermaEmail'  && location.hash!='#/ripristinaCredenziali' && location.hash!='#/creaAccount')
          this.type='admin'
        else if(sessionStorage.getItem("token") && location.hash!='#/login' && location.hash!='#/confermaEmail'  && location.hash!='#/ripristinaCredenziali' && location.hash!='#/creaAccount'){
          this.http.get("/api/refreshCliente.json").subscribe((res:any)=>{
            if(res)
              this.parser.parseData(res);
          });
        }else
          this.type='';

        if(location.hash=='#/login')
          this.route.navigate(["/dashboard"]);
        else if( location.hash=='#/confermaEmail'  || location.hash=='#/ripristinaCredenziali' || location.hash=='#/creaAccount')
          sessionStorage.clear();
      }
    });
  }

  ngOnInit(): void {
    this.parserService.getCliente().subscribe((val) => {
      let cliente=val;
      if((cliente instanceof  ClienteJunior) ||  (cliente instanceof  ClienteSenior))
        this.refresh(cliente);
    });
  }

  refresh(cliente:ClienteJunior | ClienteSenior){
    let cc : any=cliente.getContiCorrenti();
    let haveMoney:boolean=false;

    for(let i=0;i<cc.length;i++){
      if(cc[i].getSaldo()>0){
        haveMoney=true;
        break;
      }
    }
    
    if(cc.length==0)
      this.type="notContoCorrente";
    else if(cliente.getIdRuolo()==2 && haveMoney)
      this.type="juniorAttivo";
    else if(cliente.getIdRuolo()==2 && !haveMoney)
      this.type="juniorPassivo";
    else if(cliente.getIdRuolo()==3 && haveMoney)
      this.type="seniorAttivo";
    else
      this.type="seniorPassivo";
  }

  getRole(){
    if(sessionStorage.getItem("token")){
      let token:any=sessionStorage.getItem("token")?.split('.')[1];
      return JSON.parse(atob(token)).ruolo;
    }
  }
}
