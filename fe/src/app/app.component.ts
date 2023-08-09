import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RipristinaCredenzialiComponent } from './ripristina-credenziali/ripristina-credenziali.component';
import { ConfermaCreazioneAccountComponent } from './conferma-creazione-account/conferma-creazione-account.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Stage_Pattern';
  public type:any=LoginComponent;
  public showNavBar:boolean=false;

  ngOnInit(): void {
    if(location.hash.includes('#/ripristinaPassword'))
      this.type=RipristinaCredenzialiComponent;
    else if(location.hash.includes('#/confermaEmail'))
      this.type=ConfermaCreazioneAccountComponent;

    this.showOrHideNavBar();
  }

  showOrHideNavBar(){
    if(this.type.name!="LoginComponent" && this.type.name!="RipristinaCredenzialiComponent" && this.type.name!="CreaUtenzaComponent" && this.type.name!="ConfermaCreazioneAccountComponent")
      this.showNavBar=true;
  }

  refreshTypeObject(typeObject:any){
    this.type=typeObject;
    this.showOrHideNavBar();
  }
}
