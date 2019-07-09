import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AppState } from './../store/index';
import * as AuthActions from '../store/actions/auth.action';

import { environment } from '../../environments/environment';
import { AuthResponseData } from '../models/common.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userEmitter: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  logoutTimerId: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
          environment.API_KEY
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
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            responseData.expiresIn
          );
        }),
        catchError(this.errorHandler)
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
          environment.API_KEY
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
          this.handleAuthentication(
            resonseData.email,
            resonseData.localId,
            resonseData.idToken,
            resonseData.expiresIn
          );
        }),
        catchError(this.errorHandler)
      );
  }

  /**
   * 处理用户认证
   * @param email: string
   * @param id: string
   * @param token: string
   * @param expiredDate: string
   */
  handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiredDate: string
  ): void {
    const tokenExpiredDate = new Date(
      new Date().getTime() + +expiredDate * 1000
    );
    const user = new User(email, id, token, tokenExpiredDate);
    // save user to localstorage
    localStorage.setItem('userData', JSON.stringify(user));
    // set automatic logout
    this.autoLogout(+expiredDate * 1000);
    // this.userEmitter.next(user);
    this.store.dispatch(new AuthActions.Authenticate(user));
  }

  initialAuthUserStatus(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
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
      return;
    }

    // set autoLogout
    // const expiredDuration =
    //   new Date(userData._tokenExpiredDate).getTime() - new Date().getTime();
    // this.autoLogout(expiredDuration);
    // send authenticated user
    // this.userEmitter.next(user);
    this.store.dispatch(new AuthActions.Authenticate(user));
  }

  logout(): void {
    // this.userEmitter.next(null);
    this.store.dispatch(new AuthActions.Logout());
    // localStorage.removeItem('userData');
    // localStorage.removeItem('token');
    // remove logoutTimeId
    // if (this.logoutTimerId) {
    //   clearTimeout(this.logoutTimerId);
    // }
  }

  autoLogout(expiredDuration: number): void {
    console.log(expiredDuration);
    this.logoutTimerId = setTimeout(() => {
      this.logout();
    }, expiredDuration);
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
