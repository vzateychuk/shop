import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models';
import { UserService } from '../services';
import { map, take, catchError, finalize } from 'rxjs/operators';

import { SpinnerService } from './../../widgets';

@Injectable({
  providedIn: 'any'
})
export class UserResolveGuard implements Resolve<UserModel> {

  constructor(
    private userArrayService: UserService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel | null> {
    console.log('UserResolve Guard is called');

    if (route.paramMap.has('userID')) {
      this.spinner.show();
      const id = +route.paramMap.get('userID');

      return this.userArrayService.getUser(id).pipe(
        map((user: UserModel) => {
          if (user) {
            return user;
          } else {
            this.router.navigate(['/users']);
            return null;
          }
        }),
        take(1),
        catchError(() => {
          this.router.navigate(['/users']);
          return of(null);  // catchError MUST return observable
        }),
        finalize(() => this.spinner.hide())
      );
    } else {
      return of(new UserModel(null, '', ''));
    }
  }

}
