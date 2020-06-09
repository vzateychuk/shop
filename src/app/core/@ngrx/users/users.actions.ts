import { createAction, props } from '@ngrx/store';
import { UserModel, User } from 'src/app/users/models/user.model';

export const loadUsers = createAction(
  '[Users Page] Load Users'
);
export const loadUsersSuccess = createAction(
  '[Users Effect] Load Users Success',
  props<{ users: UserModel[] }>()
);
export const loadUsersError = createAction(
  '[Users Effect] Load Users Failure',
  props<{ error: Error | string }>()
);

export const createUser = createAction(
  '[Add/Edit User Page] CREATE_USER',
  props<{ user: User }>()
);
export const createUserSuccess = createAction(
  '[Create User Effect] CREATE_USER_SUCCESS',
  props<{ user: User }>()
);
export const createUserError = createAction(
  '[Create User Effect] CREATE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const updateUser = createAction(
  '[Add/Edit User Page] UPDATE_USER',
  props<{ user: UserModel }>()
);
export const updateUserSuccess = createAction(
  '[Update User Effect] UPDATE_USER_SUCCESS',
  props<{ user: User }>()
);
export const updateUserError = createAction(
  '[Update User Effect] UPDATE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const deleteUser = createAction(
  '[User List Page] DELETE_USER',
  props<{ user: User }>()
);
export const deleteUserSuccess = createAction(
  '[Delete User Effect] DELETE_USER_SUCCESS',
  props<{ user: User }>()
);
export const deleteUserError = createAction(
  '[Delete User Effect] DELETE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const setOriginalUser = createAction(
  '[Add/Edit User Page (App)] SET_ORIGINAL_USER',
  props<{ user: User }>()
);
