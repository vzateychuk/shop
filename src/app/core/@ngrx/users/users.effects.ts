import { Injectable } from '@angular/core';
import * as RouterActions from './../router/router.actions';

// @NgRx
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';

// Rxjs
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, concatMap, pluck } from 'rxjs/operators';

import { UserService } from './../../../users/services';
import { UserModel } from '../../../users/models/user.model';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userObservableService: UserService
  ) {
    console.log('[USERS EFFECTS] created');
  }

  loadUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(action =>
        this.userObservableService.getUsers().pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersError({ error })))
        )
      )
    )
  );

  updateUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      pluck('user'),
      concatMap( (user: UserModel) =>
        this.userObservableService.updateUser(user).pipe(
          map(updated => {
            // this.router.navigate(['/users', {editedUserId: updated.sku}]);
            return UsersActions.updateUserSuccess({user: updated});
          }),
          catchError(error => of(UsersActions.updateUserError({error})))
        )
      )
    )
  );

  createUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      pluck('user'),
      concatMap((user: UserModel) =>
        this.userObservableService.createUser(user).pipe(
          map(createdUser => {
            // this.router.navigate(['/users']);
            return UsersActions.createUserSuccess({ user: createdUser });
          }),
          catchError(error => of(UsersActions.createUserError({ error })))
        )
      )
    )
  );

  deleteUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      pluck('user'),
      concatMap((user: UserModel) =>
        this.userObservableService.deleteUser(user).pipe(
          // Note: json-server doesn't return deleted user
          // so we use user
          map(() => UsersActions.deleteUserSuccess({ user })),
          catchError(error => of(UsersActions.deleteUserError({ error })))
        )
      )
    )
  );

  createUpdateUserError$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUserSuccess, UsersActions.createUserSuccess),
      map(action => {
        const userID = action.user.sku;
        const actionType = action.type;
        let path: any[];
        if (actionType === '[Update User Effect] UPDATE_USER_SUCCESS') {
          path = ['/users', { editedUserID: userID }];
        } else {
          path = ['/users'];
        }

        return RouterActions.go({ path });
      } )
    );
  });

}
