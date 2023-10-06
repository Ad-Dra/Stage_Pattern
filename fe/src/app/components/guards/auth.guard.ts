import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(sessionStorage.getItem("token")){
      return this.checkUserRole(route);
    }else{ 
      return false;
    }
  }

  checkUserRole(route: ActivatedRouteSnapshot): boolean {
    if(route.data){
      const userRole = this.getRole();
      if (route.data['role'] && route.data['role'].includes(userRole) === -1) {
        return false;
      }
    }
    return true;
  }

  getRole(){
    if(sessionStorage.getItem("token")){
      let token:any=sessionStorage.getItem("token")?.split('.')[1];
      return JSON.parse(atob(token)).ruolo;
    }
  }
}
