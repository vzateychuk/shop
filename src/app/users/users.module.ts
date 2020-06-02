import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersAPIProvider } from './users.config';
import { UserComponent } from './components';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UserComponent,
    UsersRoutingModule.components
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule
  ],
  providers: [
    UsersAPIProvider
  ]
})
export class UsersModule { }
