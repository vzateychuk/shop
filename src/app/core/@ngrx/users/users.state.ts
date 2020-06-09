import { User } from './../../../users/models/user.model';

export interface UsersState {
  entities: Readonly<{ [sku: number]: User }>;
  originalUser: Readonly<User>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialUsersState: UsersState = {
  entities: {},
  originalUser: null,
  loading: false,
  loaded: false,
  error: null
};
