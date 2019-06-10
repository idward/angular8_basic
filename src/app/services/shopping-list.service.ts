import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {}

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

  integrateIngredients(ingredients: Ingredient[]): void {
    this.ingredients = [...this.ingredients, ...ingredients];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }
}
