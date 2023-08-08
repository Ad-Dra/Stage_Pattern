import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RipristinaCredenzialiComponent } from './ripristina-credenziali/ripristina-credenziali.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Stage_Pattern';
  public type:any=LoginComponent;

  ngOnInit(): void {
    if(location.hash.includes('#/ripristinaPassword'))
      this.type=RipristinaCredenzialiComponent;
  }

  refreshTypeObject(typeObject:any){
    this.type=typeObject;
  }
}
