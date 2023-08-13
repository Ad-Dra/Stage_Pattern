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
  public type:any=LoginComponent.name;
  public showNavBar:boolean=false;

  constructor(){
  }

  ngOnInit(): void {
    if(location.hash.includes('#/ripristinaPassword'))
      this.type=RipristinaCredenzialiComponent.name;
    else if(location.hash.includes('#/confermaEmail'))
      this.type=ConfermaCreazioneAccountComponent.name;

    if(sessionStorage.getItem("statusObject") && sessionStorage.getItem("statusObject")!=null && sessionStorage.getItem("statusObject")!='undefined')
      this.type=sessionStorage.getItem("statusObject");

    this.showOrHideNavBar();
    this.setStatusObject();

    if(this.type.includes("DashboardAdminComponent"))
      this.type="DashboardAdminComponent";
    else if(this.type.includes("DashboardComponent"))
      this.type="DashboardComponent";
  }

  showOrHideNavBar(){
    if(this.type!="LoginComponent" && this.type!="RipristinaCredenzialiComponent" && this.type!="CreaUtenzaComponent" && this.type!="ConfermaCreazioneAccountComponent")
      this.showNavBar=true;
    else
      this.showNavBar=false;
  }

  refreshTypeObject(typeObject:any){
    this.type=typeObject.comp.name;
    this.showOrHideNavBar();
    this.setStatusObject(typeObject.isDashboard);

    if(typeObject.isDashboard)
      this.type=typeObject.isDashboard;
  }

  setStatusObject(isDashboard?:string){
    if(this.type && this.type!="")
      if(isDashboard)
        sessionStorage.setItem("statusObject",isDashboard+"_"+this.type);
      else
        sessionStorage.setItem("statusObject",this.type);
  }
}
