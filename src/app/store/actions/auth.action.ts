import { Action } from '@ngrx/store';
import { User } from './../../models/user.model';

export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';
export const AUTO_LOG_OUT = 'AUTO_LOG_OUT';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export class LoginStart implements Action {
  readonly type = LOG_IN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOG_IN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFail implements Action {
  readonly type = LOG_IN_FAIL;
  constructor(public payload: string) {}
}

export class AutoLogout implements Action {
  readonly type = AUTO_LOG_OUT;
  constructor(public payload: number) {}
}

export class Login implements Action {
  readonly type = LOG_IN;
  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = LOG_OUT;
}

export type AuthAction = Login | Logout | LoginStart | LoginSuccess | LoginFail | AutoLogout;
