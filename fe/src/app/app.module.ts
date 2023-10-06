import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './components/input/inputText/input-text/input-text.component';
import { ShowHidePswComponent } from './components/input/show-hide-psw/show-hide-psw.component';
import { ErrorInterceptor } from './components/interceptor/error-interceptor';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';

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
import { ConfermaCancellazioneComponent } from './conferma-cancellazione/conferma-cancellazione.component';
import { ModificaContiCorrrentiUtenteComponent } from './modifica-conti-corrrenti-utente/modifica-conti-corrrenti-utente.component';
import { PrestitoComponent } from './prestito/prestito.component';
import { ParserComponent } from './parser/parser.component';
import { AuthGuard } from './components/guards/auth.guard';
import { NavBarJuniorAttivoComponent } from './components/nav-bar-junior-attivo/nav-bar-junior-attivo.component';
import { NavBarJuniorPassivoComponent } from './components/nav-bar-junior-passivo/nav-bar-junior-passivo.component';
import { ParserService } from './parser/parserService';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarSeniorAttivoComponent } from './components/nav-bar-senior-attivo/nav-bar-senior-attivo.component';
import { NavBarSeniorPassivoComponent } from './components/nav-bar-senior-passivo/nav-bar-senior-passivo.component';
import { NavBarNotContoCorrenteComponent } from './components/nav-bar-not-conto-corrente/nav-bar-not-conto-corrente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputTextComponent,
    ShowHidePswComponent,
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
    CreaContoCorrenteClienteComponent,
    ConfermaCancellazioneComponent,
    ModificaContiCorrrentiUtenteComponent,
    PrestitoComponent,
    ParserComponent,
    NavBarJuniorAttivoComponent,
    NavBarJuniorPassivoComponent,
    DashboardComponent,
    NavBarSeniorAttivoComponent,
    NavBarSeniorPassivoComponent,
    NavBarNotContoCorrenteComponent
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
  providers: [AppComponent,ParserService,AuthGuard,ParserComponent,{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi: true},{ provide: COMPONENT_B_TOKEN, useValue: LoginComponent}],
  bootstrap: [AppComponent]
})
export class AppModule { }
