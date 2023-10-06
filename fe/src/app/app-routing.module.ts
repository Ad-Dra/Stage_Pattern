import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AuthGuard } from './components/guards/auth.guard';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { BonificoComponent } from './bonifico/bonifico.component';
import { PrestitoComponent } from './prestito/prestito.component';
import { RicaricaTelefonicaComponent } from './ricarica-telefonica/ricarica-telefonica.component';
import { InfoAccountComponent } from './info-account/info-account.component';
import { MovimentiComponent } from './movimenti/movimenti.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfermaCreazioneAccountComponent } from './conferma-creazione-account/conferma-creazione-account.component';
import { CreaUtenzaComponent } from './crea-utenza/crea-utenza.component';
import { RipristinaCredenzialiComponent } from './ripristina-credenziali/ripristina-credenziali.component';

const routes: Routes = [
  { path:'', redirectTo: 'login', pathMatch: 'full' },
  { path:'login', component: LoginComponent},
  { path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard],data: {role: 'Cliente'}},
  { path:'chiSiamo', component:ChiSiamoComponent,canActivate: [AuthGuard],data: {role: 'Cliente'}},
  { path:'bonifico', component:BonificoComponent,canActivate: [AuthGuard],data: {role: 'Cliente'}},
  { path:'prestito', component:PrestitoComponent,canActivate: [AuthGuard],data: {role: 'Cliente Senior'}},
  { path:'ricaricaTelefonica', component:RicaricaTelefonicaComponent,canActivate: [AuthGuard],data: {role: 'Cliente Senior'}},
  { path:'infoAccount', component:InfoAccountComponent,canActivate: [AuthGuard],data: {role: 'Cliente'}},
  { path:'movimenti', component:MovimentiComponent,canActivate: [AuthGuard],data: {role: 'Cliente'}},
  { path:'ripristinaCredenziali', component:RipristinaCredenzialiComponent},
  { path:'ripristinaPassword/:email/:token', component:RipristinaCredenzialiComponent},


  { path:'creaAccount', component:CreaUtenzaComponent},
  { path:'confermaEmail/:email/:username/:token', component:ConfermaCreazioneAccountComponent},

 
  { path:'dashboardAdmin', component:DashboardAdminComponent,canActivate: [AuthGuard],data: {role: 'Admin'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
