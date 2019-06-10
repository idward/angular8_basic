import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'This is my recipe 1',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
      [new Ingredient('Milk', 10), new Ingredient('Bread', 15)]
    )
  ];
  recipeEvt: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: string): Recipe {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.integrateIngredients(ingredients);
  }
}
