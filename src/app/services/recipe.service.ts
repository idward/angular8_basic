import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Recipe 1',
  //     'This is my recipe 1',
  //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
  //     [new Ingredient('Milk', 10), new Ingredient('Bread', 15)]
  //   ),
  //   new Recipe(
  //     'Recipe 2',
  //     'This is my recipe 2',
  //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
  //     [new Ingredient('Sugar', 15), new Ingredient('Banana', 5)]
  //   )
  // ];
  recipes: Recipe[] = [];
  recipeEvt: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  recipeChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes);
  }

  updateRecipe(index: string, editedRecipe: Recipe): void {
    this.recipes = this.recipes.map((recipe: Recipe) => {
      if (recipe.id === index) {
        recipe = { ...recipe, ...editedRecipe };
        return recipe;
      }
      return recipe;
    });

    this.recipeChanged.next(this.recipes);
  }

  deleteRecipe(index: string): void {
    this.recipes = this.recipes.filter((recipe: Recipe) => {
      return recipe.id !== index;
    });
    this.recipeChanged.next(this.recipes);
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: string): Recipe {
    return this.recipes.find(recipe => recipe.id === id);
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.integrateIngredients(ingredients);
  }
}
