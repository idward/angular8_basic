import * as AuthActions from '../actions/auth.action';
import { User } from './../../models/user.model';

export interface AuthState {
  user: User;
  authError: string;
}

const initialState: AuthState = {
  user: null,
  authError: null
};

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthAction
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE:
      return {
        ...state,
        user: action.payload,
        authError: null
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
