import { InjectionToken } from '@angular/core';

const usersBaseUrl = 'http://localhost:3000/products';
export const UsersAPI = new InjectionToken<string>('UsersAPI');

export const UsersAPIProvider = {
    provide: UsersAPI,
    useValue: usersBaseUrl
};

