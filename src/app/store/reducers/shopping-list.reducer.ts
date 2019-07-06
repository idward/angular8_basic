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
    default:
      return state;
  }
}
