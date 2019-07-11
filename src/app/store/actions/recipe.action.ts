import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const FETCH_RECIPES_START = 'FETCH_RECIPES_START';
export const FETCH_RECIPES = 'FETCH_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipesStart implements Action {
  readonly type = FETCH_RECIPES_START;
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export type RecipeAction = SetRecipes | FetchRecipes;
