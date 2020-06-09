import { Action, createReducer, on } from '@ngrx/store';

import { UsersState, initialUsersState } from './users.state';
import * as UsersActions from './users.actions';
import { User } from './../../../users/models/user.model';

const reducer = createReducer(
  initialUsersState,

  on(UsersActions.loadUsers, state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(UsersActions.loadUsersSuccess, (state, { users }) => {
    const data = [...users];

    const entities = data.reduce(
      (result: { [sku: number]: User }, user: User) => {
        return {
          ...result,
          [user.sku]: user
        };
      },
      {
        ...state.entities
      }
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    };
  }),

  on(UsersActions.loadUsersError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

  on(
    UsersActions.createUserSuccess,
    UsersActions.updateUserSuccess,
    (state, { user }) => {
      const createdUpdatedUser = { ...user };
      const entities = {
        ...state.entities,
        [createdUpdatedUser.sku]: createdUpdatedUser
      };
      const originalUser = { ...createdUpdatedUser };

      return {
        ...state,
        entities,
        originalUser
      };
    }
  ),

  on(
    UsersActions.createUserError,
    UsersActions.updateUserError,
    UsersActions.deleteUserError,
    (state, { error }) => {
      return {
        ...state,
        error
      };
    }
  ),

  on(UsersActions.deleteUserSuccess, (state, { user }) => {
    const { [user.sku]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities
    };
  }),

  on(UsersActions.setOriginalUser, (state, { user }) => {
    const originalUser = { ...user };

    return {
      ...state,
      originalUser
    };
  })
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
