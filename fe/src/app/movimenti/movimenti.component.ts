import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movimenti',
  templateUrl: './movimenti.component.html',
  styleUrls: ['./movimenti.component.scss']
})
export class MovimentiComponent implements OnInit{
  
  public movimenti:any=[];
  
  constructor(private http:HttpClient){

  }
  
  ngOnInit(): void {
    this.getMovimenti();
  }

  getMovimenti(){
    this.http.get("/api/getMovimenti.json").subscribe((res:any)=>{
      if(res){
        res.reverse();
        this.movimenti=res;
      }
    })
  }
}
