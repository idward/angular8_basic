import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of, Observable, timer } from 'rxjs';

import * as AuthActions from '../actions/auth.action';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from 'src/app/models/common.model';
import { User } from 'src/app/models/user.model';

export interface LoginModel {
  email: string;
  password: string;
}

@Injectable()
export class AuthEffect {
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  @Effect()
  authLogin = this.action$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
            environment.API_KEY
          }`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(responseData => {
            const tokenExpiredDate = new Date(
              new Date().getTime() + +responseData.expiresIn * 1000
            );
            const user = new User(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              tokenExpiredDate
            );
            return new AuthActions.Authenticate(user);
          }),
          catchError((errorRes: HttpErrorResponse) => {
            let errorMessage: string = 'An unknown error occurred';

            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.AuthenticateFail(errorMessage));
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
            return of(new AuthActions.AuthenticateFail(errorMessage));
          })
        );
    })
  );

  @Effect()
  authSuccess = this.action$.pipe(
    ofType(AuthActions.AUTHENTICATE),
    switchMap((authData: AuthActions.Authenticate) => {
      // save user to localstorage
      if (!localStorage.getItem('userData')) {
        localStorage.setItem('userData', JSON.stringify(authData.payload));
      }
      const expiredDuration =
        authData.payload.tokenExpiredDate.getTime() - new Date().getTime();
      return of(new AuthActions.AuthenticateSuccess(expiredDuration));
    })
  );

  @Effect()
  autoLogout = this.action$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    switchMap((authData: AuthActions.AuthenticateSuccess) => {
      return timer(authData.payload);
    }),
    map(() => {
      return new AuthActions.Logout();
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.action$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.action$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
}
