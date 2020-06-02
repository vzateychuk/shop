import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

// rxjs
import { Subscription, Observable } from 'rxjs';

import { UserModel } from './../../models/user.model';
import { UserService } from '../../services';
import { CanComponentDeactivate, DialogService } from 'src/app/core';
import { pluck } from 'rxjs/operators';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;
  originalUser: UserModel;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      pluck('user')
    ).subscribe((user: UserModel) => {
      this.user = { ...user };
      this.originalUser = { ...user };
    });
  }

  onSaveUser() {
    const user = {...this.user};

    if (user.sku) {
      this.userService.updateUser(user);
      this.router.navigate(['/users', {editedUserID: user.sku}]);
    } else {
      this.userService.createUser(user);
      this.onGoBack();
    }
    this.originalUser = {...this.user};
  }

  onGoBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route});
  }

  // вызывается когда пользователь пробует уйти с формы
  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = Object.keys(this.originalUser).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      } else {
        return false;
      }
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}
