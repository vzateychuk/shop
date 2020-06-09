import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models';
import { map, take, catchError, finalize, tap, delay } from 'rxjs/operators';

import { SpinnerService } from './../../widgets';
import { Store, select } from '@ngrx/store';
import { AppState, selectSelectedUserByUrl } from 'src/app/core/@ngrx';

import * as UsersActions from './../../core/@ngrx/users/users.actions';

@Injectable({
  providedIn: 'any'
})
export class UserResolveGuard implements Resolve<UserModel> {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(): Observable<UserModel> | null {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.pipe(
      select(selectSelectedUserByUrl),
      tap(user => this.store.dispatch(UsersActions.setOriginalUser({ user }))),
      // delay(2000),
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
        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }

}
