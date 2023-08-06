import {HttpErrorResponse, HttpEvent,HttpHandler,HttpHeaders,HttpInterceptor,HttpRequest, HttpResponse,} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private spinner: NgxSpinnerService,private message: NotificationsService) {
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
            this.message.success('',event.body.message, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
            });
          }
        }
      }),
      catchError((error:HttpErrorResponse) => {
       
        this.hideLoader();
        if(error.status==403){
          window.location.href="http://localhost:4200/#/login";
          sessionStorage.clear();
        }
          
        this.message.error('Errore', error && error.error && error.error.message, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
        
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
}

