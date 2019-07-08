import { Action } from '@ngrx/store';
import { User } from './../../models/user.model';

export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export class LoginStart implements Action {
  readonly type = LOG_IN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class Login implements Action {
  readonly type = LOG_IN;
  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = LOG_OUT;
}

export type AuthAction = Login | Logout | LoginStart;
