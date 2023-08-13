import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputTextComponent } from './components/input/inputText/input-text/input-text.component';
import { ShowHidePswComponent } from './components/input/show-hide-psw/show-hide-psw.component';
import { ErrorInterceptor } from './components/interceptor/error-interceptor';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RipristinaCredenzialiComponent } from './ripristina-credenziali/ripristina-credenziali.component';
import { CreaUtenzaComponent } from './crea-utenza/crea-utenza.component';
import { ConfermaCreazioneAccountComponent } from './conferma-creazione-account/conferma-creazione-account.component';
export const COMPONENT_B_TOKEN = new InjectionToken<any>('ComponentBToken');
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from './components/grids/grid/grid/grid.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { BonificoComponent } from './bonifico/bonifico.component';
import { SelectComponent } from './components/select/select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextAreaComponent } from './components/input/textArea/text-area/text-area.component';
import { RicaricaTelefonicaComponent } from './ricarica-telefonica/ricarica-telefonica.component';
import { MovimentiComponent } from './movimenti/movimenti.component';
import { InfoAccountComponent } from './info-account/info-account.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { NavBarAdminComponent } from './components/nav-bar-admin/nav-bar-admin.component';
import { CreaContoCorrenteClienteComponent } from './crea-conto-corrente-cliente/crea-conto-corrente-cliente.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InputTextComponent,
    ShowHidePswComponent,
    NavBarComponent,
    RipristinaCredenzialiComponent,
    CreaUtenzaComponent,
    ConfermaCreazioneAccountComponent,
    GridComponent,
    ChiSiamoComponent,
    BonificoComponent,
    SelectComponent,
    TextAreaComponent,
    RicaricaTelefonicaComponent,
    MovimentiComponent,
    InfoAccountComponent,
    DashboardAdminComponent,
    NavBarAdminComponent,
    CreaContoCorrenteClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbModule,
    NgSelectModule,
    NgxSmartModalModule.forRoot(),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        }
      },
      behaviour: {
        autoHide: false,
        onClick: "hide",
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 12,
      },
    })
  ],
  providers: [LoginComponent,DashboardComponent,RipristinaCredenzialiComponent,CreaUtenzaComponent,ConfermaCreazioneAccountComponent,ChiSiamoComponent,BonificoComponent,RicaricaTelefonicaComponent,InfoAccountComponent,MovimentiComponent,DashboardAdminComponent,{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi: true},{ provide: COMPONENT_B_TOKEN, useValue: LoginComponent}],
  bootstrap: [AppComponent]
})
export class AppModule { }
