import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersServiceModule } from './users.service.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UsersAPIProvider } from './users.config';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UsersServiceModule
  ],
  providers: [
    UsersAPIProvider
  ]
})
export class UsersModule { }
