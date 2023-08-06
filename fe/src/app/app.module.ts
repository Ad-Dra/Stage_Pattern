import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InputTextComponent,
    ShowHidePswComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
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
  providers: [LoginComponent,DashboardComponent,{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
