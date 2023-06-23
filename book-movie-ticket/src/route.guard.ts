import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app/app.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor( private appService: AppService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (state.url.includes('movies') || state.url.includes('theatres') || state.url.includes('bookTicket')) {

        if (this.appService.isAuthenticated) {
          return true;
        }
        else {
          this.router.navigateByUrl('/createaccount/1');
          return false;
        }

      } else {
        if (state.url.includes('createaccount')) {
          this.appService.isAuthenticated = false;
        }
        return true;
      }
  }
  
}
