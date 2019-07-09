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
    case AuthActions.LOG_IN:
      return {
        ...state,
        user: action.payload,
        authError: null
      };
    case AuthActions.LOG_OUT:
      return {
        ...state,
        user: null,
        authError: null
      };
    case AuthActions.LOG_IN_START:
      return {
        ...state,
        authError: null
      };
    case AuthActions.LOG_IN_FAIL:
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
