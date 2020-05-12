import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersAPI } from '../users.config';
import { Observable, throwError } from 'rxjs';
import { retry, publish, refCount, catchError } from 'rxjs/operators';

import { UserModel } from '../models';
import { UsersServiceModule } from '../users.service.module';

@Injectable({
  providedIn: UsersServiceModule
})
export class UsersService {

  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers(): Observable<UserModel[]> {
    return this.http
      .get<UserModel[]>(this.usersUrl)
      .pipe(
        retry(3),
        publish(),
        refCount(),
        catchError(this.handleError)
      );
   }

  getUser(id: number) {}

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
