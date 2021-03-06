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
    case RecipeActions.FETCH_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe: Recipe) => {
          if (recipe.id === action.payload.id) {
            recipe = { ...recipe, ...action.payload.recipe };
          }
          return recipe;
        })
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe: Recipe) => recipe.id !== action.payload
        )
      };
    default:
      return state;
  }
}
