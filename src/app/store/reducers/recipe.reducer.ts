import { Recipe } from 'src/app/models/recipe.model';
import * as RecipeActions from '../actions/recipe.action';

export interface RecipeState {
  recipes: Recipe[];
}
const initialState: RecipeState = {
  recipes: []
};

export function RecipeReducer(
  state = initialState,
  action: RecipeActions.RecipeAction
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
  }
}
