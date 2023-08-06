import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stage_Pattern';
  public type=LoginComponent;

  refreshTypeObject(typeObject:any){
    this.type=typeObject;
  }
}
