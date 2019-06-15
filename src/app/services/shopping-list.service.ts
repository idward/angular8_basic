import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];
  ingredientEmitter: Subject<Ingredient[]> = new Subject<Ingredient[]>();

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
}
