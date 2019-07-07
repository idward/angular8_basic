import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';

// Action type constant
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
/* Action Start */
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class EditIngredient implements Action {
  readonly type = EDIT_INGREDIENT;
  constructor(public payload: number) {}
}

export class ClearIngredient implements Action {
  readonly type = CLEAR_INGREDIENT;
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: { index: number; ingredient: Ingredient }) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}
/* Action End */

export type ShoppingListAction =
  | AddIngredient
  | AddIngredients
  | EditIngredient
  | ClearIngredient
  | UpdateIngredient
  | DeleteIngredient;
