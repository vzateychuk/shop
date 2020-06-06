import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../models';

@Component({
  selector: 'epa-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {

  @Input() user: UserModel;
  @Output() editUser = new EventEmitter<UserModel>();

  onEditUser() {
    this.editUser.emit(this.user);
  }

}
