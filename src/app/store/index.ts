import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import {
  ShoppingListReducer,
  ShoppingListState
} from './reducers/shopping-list.reducer';
import { AuthReducer, AuthState } from './reducers/auth.reducer';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
  router: RouterReducerState;
}

export const rootReducer: ActionReducerMap<AppState> = {
  shoppingList: ShoppingListReducer,
  auth: AuthReducer,
  router: routerReducer
};
