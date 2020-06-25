import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// rxjs
import { Observable, Subscription } from 'rxjs';
// NgRx
import { Store, select } from '@ngrx/store';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';
import { AppState, selectUsers, selectUsersError, selectEditedUser } from './../../../core/@ngrx';

import { UserModel, User } from './../../models/user.model';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<Array<UserModel>>;
  usersError$: Observable<Error | string>;
  private subscription: Subscription;

  private editedUser: UserModel;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.users$ = this.store.pipe( select(selectUsers) );
    this.usersError$ = this.store.pipe( select(selectUsersError) );
    this.store.dispatch( UsersActions.loadUsers() );

    this.subscription = this.store.pipe(select(selectEditedUser)).subscribe({
      next: user => {
        this.editedUser = { ...user };
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditUser(user: UserModel) {
    // const link = ['edit', user.sku];
    // this.router.navigate(link, {relativeTo: this.route});
    // or
    const link = ['/users/edit', user.sku];
    this.router.navigate(link);
    // or
    // const link = ['/edit', user.sku];
    // this.store.dispatch( RouterActions.go({ path: [link] }));
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.sku === this.editedUser.sku;
    }
    return false;
  }

  onDeleteUser(user: UserModel) {
    const userToDelete: User = { ...user };
    this.store.dispatch(UsersActions.deleteUser({ user: userToDelete }));
  }
}
