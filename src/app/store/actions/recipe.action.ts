import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';

export const SET_RECIPES = 'SET_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export type RecipeAction = SetRecipes;
