import { Action } from '@ngrx/store';
import { User } from './../../models/user.model';

export const LOGIN_START = 'LOGIN_START';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const AUTO_LOGOUT = 'AUTO_LOG_OUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class AutoLogout implements Action {
  readonly type = AUTO_LOGOUT;
  constructor(public payload: number) {}
}

export class Authenticate implements Action {
  readonly type = AUTHENTICATE;
  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthAction =
  | Authenticate
  | Logout
  | LoginStart
  | AuthenticateFail
  | AutoLogout
  | ClearError;
