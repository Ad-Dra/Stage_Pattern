import { Component, OnInit } from '@angular/core';
import { Stage } from '../stage/stage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements Stage,OnInit{
  
  public identificativo:string="";
  public saldo:number=0.0;

  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    this.getInfoAccount();
    this.getSaldo();
  }

  getInfoAccount(){
    this.http.get("/api/getinfoAccount.json").subscribe((res:any)=>{
      if(res && res.length>0){
        this.identificativo=res[0].cognome+" "+res[0].nome;
      }
    })
  }

  getSaldo(){
    this.http.get("/api/getSaldo.json").subscribe((res:any)=>{
      if(res && res.length>0){
        this.identificativo=res[0].saldo;
      }
    })
  }

  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }
}
