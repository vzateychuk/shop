import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../interfaces/can-component-deactivate.interface';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,  // компонет должен имплементировать интерфейс
    // currentRoute: ActivatedRouteSnapshot,
    // currentState: RouterStateSnapshot,
    // nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const componentCanDeactivate = component.canDeactivate();
      console.log(`CanDeactivate Guard is called ${componentCanDeactivate}`);
      return componentCanDeactivate;
  }

}
