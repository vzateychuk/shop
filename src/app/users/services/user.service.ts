import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersAPI } from '../users.config';
import { Observable, throwError } from 'rxjs';
import { publish, refCount, catchError, delay } from 'rxjs/operators';

import { UserModel } from '../models';

@Injectable({
  providedIn: 'any'
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers(): Observable<UserModel[]> {
    return this.http
      .get<UserModel[]>(this.usersUrl)
      .pipe(
        publish(),
        refCount(),
        catchError(this.handleError)
      );
   }

  getUser(id: number | string): Observable<UserModel> {
    const url = `${this.usersUrl}/${id}`;

    return this.http
      .get(url)
      .pipe(
        delay(1000),
        publish(),
        refCount(),
        catchError(this.handleError)
      );
  }

  updateUser(user: UserModel) {}

  createUser(user: UserModel) {}

  deleteUser(user: UserModel) {}

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof Error) {
      // In case of client-side or network error occurred.
      errorMessage = `Client-side or network error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returns code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
