import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users.effects';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './users.reducer';
import { UserService } from 'src/app/users';
import { UsersAPIProvider } from 'src/app/users/users.config';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [UserService, UsersAPIProvider]
})
export class UsersStoreModule { }
