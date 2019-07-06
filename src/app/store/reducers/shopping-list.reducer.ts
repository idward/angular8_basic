import * as ShoppingListActions from '../actions/shopping-list.action';
import { Ingredient } from 'src/app/models/ingredient.model';

export interface ShoppingListStore {
  ingredients: Ingredient[];
}

const initialState: ShoppingListStore = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)]
};

export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
