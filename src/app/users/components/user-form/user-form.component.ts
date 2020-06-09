import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectUsersOriginalUser } from './../../../core/@ngrx';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';

import { UserModel, User } from './../../models/user.model';
import { CanComponentDeactivate, DialogService } from 'src/app/core';
import { pluck, switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private location: Location,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      pluck('user')
    ).subscribe((user: UserModel) => {
      this.user = { ...user };
    });
  }

  onSaveUser() {
    const user = {...this.user} as User;

    if (user.sku) {
      this.store.dispatch(UsersActions.updateUser({ user }));
    } else {
      this.store.dispatch(UsersActions.createUser({ user }));
    }
  }

  onGoBack() {
    this.location.back();
  }

  // вызывается когда пользователь пробует уйти с формы
  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const flags = Object.keys(this.originalUser).map(key => {
    //   if (this.originalUser[key] === this.user[key]) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    // if (flags.every(el => el)) {
    //   return true;
    // }

    // // Otherwise ask the user with the dialog service and return its
    // // promise which resolves to true or false when the user decides
    // return this.dialogService.confirm('Discard changes?');
    const flags = [];

    return this.store.pipe(
      select(selectUsersOriginalUser),
      switchMap(originalUser => {
        for (const key in originalUser) {
          if (originalUser[key] === this.user[key]) {
            flags.push(true);
          } else {
            flags.push(false);
          }
        }

        if (flags.every(el => el)) {
          return of(true);
        } else {
          // Otherwise ask the user with the dialog service and return its
          // promise which resolves to true or false when the user decides
          return this.dialogService.confirm('Discard changes?');
        }
      })
    );
  }

}
