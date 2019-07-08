import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  logoutTimerId: any;
  constructor(private action$: Actions, private http: HttpClient) {}

  @Effect()
  authLogin = this.action$.pipe(
    ofType(AuthActions.LOG_IN_START),
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
            return new AuthActions.Login(user);
          }),
          catchError(error => {
            return of();
          })
        );
    })
  );

  @Effect()
  authSuccess = this.action$.pipe(
    ofType(AuthActions.LOG_IN_SUCCESS),
    switchMap((authData: AuthActions.LoginSuccess) => {
      // save user to localstorage
      localStorage.setItem('userData', JSON.stringify(authData.payload));
      const expiredDuration =
        authData.payload.tokenExpiredDate.getTime() - new Date().getTime();
      return of(new AuthActions.AutoLogout(expiredDuration));
    })
  );

  @Effect()
  authAutoLogout = this.action$.pipe(
    ofType(AuthActions.AUTO_LOG_OUT),
    switchMap((authData: AuthActions.AutoLogout) => {
      // setTimeout
      this.logoutTimerId = setTimeout(() => {
        return of(new AuthActions.Logout());
      }, authData.payload);

      return of({ type: 'DUMMY' });
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.action$.pipe(
    ofType(AuthActions.LOG_OUT),
    tap(() => {
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      if (this.logoutTimerId) {
        clearTimeout(this.logoutTimerId);
      }
    })
  );
}
