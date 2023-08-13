import {HttpErrorResponse, HttpEvent,HttpHandler,HttpHeaders,HttpInterceptor,HttpRequest, HttpResponse,} from '@angular/common/http';
import { EventEmitter, Injectable, Output} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginComponent } from 'src/app/login/login.component';
import { Stage } from 'src/app/stage/stage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor,Stage{
  @Output() changeType: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private spinner: NgxSpinnerService,private notifier: NotifierService,private login:LoginComponent) {
  }

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    let req=request.clone({
      headers:new HttpHeaders().append('Authorization',`${sessionStorage.getItem("token")}`)
    })

    return next.handle(req).pipe(
      tap((event:HttpEvent<any>)=>{
        if (event instanceof HttpResponse && event.status === 200) {
          this.hideLoader();
          if(event && event.body  && event.body.message){
            this.notifier.notify("success", event.body.message );
          }
        }
      }),
      catchError((error:HttpErrorResponse) => {
       
        this.hideLoader();
        if(error.status==403){
          sessionStorage.clear();
          this.renew(this.login);
          this.changeType.emit({comp:LoginComponent});
        }
          
        this.notifier.notify('error', error && error.error && error.error.message );
        
        return  throwError(error);
      })
    );
  }

  private showLoader(): void {
      this.spinner.show();
  }
  private hideLoader(): void {
      this.spinner.hide();
  }

  renew(newType: Stage): void {
    Object.setPrototypeOf(this, newType);
  }
}

