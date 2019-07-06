import { EditedIngredient } from 'src/app/models/common.model';
import * as ShoppingListActions from '../actions/shopping-list.action';
import { Ingredient } from 'src/app/models/ingredient.model';

export interface ShoppingListStore {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  indexOfIngredients: number;
}

const initialState: ShoppingListStore = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  indexOfIngredients: null
};

export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListAction
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.EDIT_INGREDIENT:
      const editedIngredient = state.ingredients[action.payload];
      return {
        ...state,
        editedIngredient,
        indexOfIngredients: action.payload
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      // 性能优化不是最好的方案
      const updatedIngredients = state.ingredients.map(
        (ingredient: Ingredient, index: number) => {
          if (index === action.payload.index) {
            ingredient = action.payload.ingredient;
          }
          return ingredient;
        }
      );
      return {
        ...state,
        ingredients: updatedIngredients,
        EditedIngredient: null,
        indexOfIngredients: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const removedIngredients = state.ingredients.filter(
        (ingredient: Ingredient, index: number) => {
          return index !== action.payload;
        }
      );
      return {
        ...state,
        ingredients: removedIngredients,
        editedIngredient: null,
        indexOfIngredients: null
      };
    default:
      return state;
  }
}
