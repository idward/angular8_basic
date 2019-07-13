import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of, Observable, timer } from 'rxjs';

import * as AuthActions from '../actions/auth.action';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from 'src/app/models/common.model';
import { User } from 'src/app/models/user.model';

// 认证成功后用户信息处理
const authenticationHandler = (responseData: AuthResponseData): Action => {
  const tokenExpiredDate = new Date(
    new Date().getTime() + +responseData.expiresIn * 1000
  );
  // const tokenExpiredDate = new Date(
  //   new Date().getTime() + 10000
  // );
  const user = new User(
    responseData.email,
    responseData.localId,
    responseData.idToken,
    tokenExpiredDate
  );
  return new AuthActions.Authenticate(user);
};

// 认证失败后错误信息处理
const errorHandler = (
  errorRes: HttpErrorResponse
): Observable<AuthActions.AuthenticateFail> => {
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
};

@Injectable()
export class AuthEffect {
  isRedirect: boolean = false;
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  @Effect()
  authLogin = this.action$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      this.isRedirect = true;
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
          map(authenticationHandler),
          catchError(errorHandler)
        );
    })
  );

  @Effect()
  authSignup = this.action$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      this.isRedirect = true;
      return this.http
        .post<AuthResponseData>(
          `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
            environment.API_KEY
          }`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(authenticationHandler),
          catchError(errorHandler)
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
        new Date(authData.payload.tokenExpiredDate).getTime() -
        new Date().getTime();
      return of(new AuthActions.AuthenticateSuccess(expiredDuration));
    })
  );

  @Effect()
  autoLogin = this.action$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    switchMap((authData: AuthActions.AutoLogin) => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return of({ type: 'DUMMY' });
      }
      // 如果不重新new User(), token会无法拿到
      const user = new User(
        userData.email,
        userData.id,
        userData._token,
        userData._tokenExpiredDate
      );
      // token过期
      if (!user.token) {
        return of(new AuthActions.Logout());
      }
      return of(new AuthActions.Authenticate(user));
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
      this.isRedirect = true;
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.action$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      if (this.isRedirect) {
        this.router.navigate(['/']);
      }
    })
  );
}
