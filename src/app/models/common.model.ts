import { Ingredient } from './ingredient.model';

export interface EditedIngredient {
  index: number;
  editedIngredient: Ingredient;
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
