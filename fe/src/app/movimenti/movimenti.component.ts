import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movimenti',
  templateUrl: './movimenti.component.html',
  styleUrls: ['./movimenti.component.scss']
})
export class MovimentiComponent implements OnInit{
  
  
  constructor(private http:HttpClient){

  }
  
  ngOnInit(): void {
    this.getMovimenti();
  }

  getMovimenti(){
    this.http.get("/api/getMovimenti.json").subscribe((res)=>{
      if(res)
        console.log(res);
    })
  }
}
