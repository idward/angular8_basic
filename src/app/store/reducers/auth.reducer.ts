import * as AuthActions from '../actions/auth.action';
import { User } from './../../models/user.model';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthAction
) {
  switch (action.type) {
    case AuthActions.LOG_IN:
      return {
        ...state,
        user: action.payload
      };
    case AuthActions.LOG_OUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
