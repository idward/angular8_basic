import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import config from '../config/index';
import { AuthResponseData } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
          config['APP_KEY']
        }`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(responseData => {
          console.log(responseData);
        }),
        catchError(this.errorHandler)
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
          config['APP_KEY']
        }`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(resonseData => {
          console.log(resonseData);
        }),
        catchError(this.errorHandler)
      );
  }

  /**
   * 错误处理
   * @param errorRes : HttpErrorResponse
   */
  private errorHandler(errorRes: HttpErrorResponse): Observable<any> {
    let errorMessage: string = 'An unknown error occurred';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email has been taken';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User is not existed';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is not match';
        break;
    }
    return throwError(errorMessage);
  }
}
