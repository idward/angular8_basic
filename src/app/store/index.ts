import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import {
  ShoppingListReducer,
  ShoppingListState
} from './reducers/shopping-list.reducer';
import { AuthReducer, AuthState } from './reducers/auth.reducer';
import { RecipeReducer, RecipeState } from './reducers/recipe.reducer';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
  recipes: RecipeState;
  router: RouterReducerState;
}

export const rootReducer: ActionReducerMap<AppState> = {
  shoppingList: ShoppingListReducer,
  auth: AuthReducer,
  recipes: RecipeReducer,
  router: routerReducer
};
