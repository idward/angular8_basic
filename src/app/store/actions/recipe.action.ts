import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const FETCH_RECIPES_START = 'FETCH_RECIPES_START';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';

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

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class AddRecipeSuccess implements Action {
  readonly type = ADD_RECIPE_SUCCESS;
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: string) {}
}

export class DeleteRecipeSuccess implements Action {
  readonly type = DELETE_RECIPE_SUCCESS;
}

export type RecipeAction = SetRecipes | FetchRecipes | AddRecipe | DeleteRecipe;
