import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';
import { EditedIngredient } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];
  ingredientEmitter: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  startEditEmitter: Subject<EditedIngredient> = new Subject<EditedIngredient>();

  constructor() {}

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientEmitter.next(this.ingredients);
  }

  integrateIngredients(newIngredients: Ingredient[]): void {
    this.ingredients = [...this.ingredients, ...newIngredients];
    this.ingredientEmitter.next(this.ingredients);
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  editIngredient(editedElement: EditedIngredient): void {
    this.ingredients = this.ingredients.map((ingredient, index) => {
      if (index === editedElement.index) {
        return editedElement.editedIngredient;
      }
      return ingredient;
    });
    // this.ingredientEmitter.next(this.ingredients);
  }
}
