import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';

import { UserModel } from './../../models/user.model';
import { UserService } from '../../services/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<Array<UserModel>>;
  private editedUser: UserModel;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();

    const observer = {
      next: (user: UserModel) => {
        this.editedUser = { ...user };
        console.log( `Last time you edited user ${JSON.stringify(this.editedUser)}`);
      },
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.userService.getUser(+params.get('editedUserID')))
      )
      .subscribe(observer);
  }

  onEditUser(user: UserModel) {
    const link = ['edit', user.sku];
    this.router.navigate(link, {relativeTo: this.route});
    // or
    // const link = ['/users/edit', user.sku];
    // this.router.navigate(link);
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.sku === this.editedUser.sku;
    }
    return false;
}
}
