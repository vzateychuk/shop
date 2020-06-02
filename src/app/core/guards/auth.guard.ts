import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { url } = state;
    const isPermitted = this.checkLogin(url);
    console.log(`CanActivate Guard is called: ${isPermitted}`);
    return isPermitted;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const { url } = state;
      const isPermitted = this.checkLogin(url);
      console.log(`canActivateChild Guard is called: ${isPermitted}`);
      return isPermitted;
  }

  private checkLogin(url: string): boolean | UrlTree {
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    if (this.authService.isLoggedIn) {
      return true;
    } else {
      // Navigate to the login page, return UrlTree
      return this.router.parseUrl('/login');
    }
  }
}
