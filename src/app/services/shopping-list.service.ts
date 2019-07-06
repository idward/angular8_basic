import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as ShoppingListActions from '../store/actions/shopping-list.action';
import { ShoppingListStore } from '../store/reducers/shopping-list.reducer';

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

  constructor(private store: Store<{ shoppingList: ShoppingListStore }>) {}

  addIngredient(ingredient: Ingredient): void {
    // this.ingredients.push(ingredient);
    // this.ingredientEmitter.next(this.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
  }

  integrateIngredients(newIngredients: Ingredient[]): void {
    this.ingredients = [...this.ingredients, ...newIngredients];
    this.ingredientEmitter.next(this.ingredients);
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  startEditIngredient(index: number): void {
    this.store.dispatch(new ShoppingListActions.EditIngredient(index));
  }

  editIngredient(editedElement: EditedIngredient): void {
    // this.ingredients = this.ingredients.map(
    //   (ingredient: Ingredient, index: number) => {
    //     if (index === editedElement.index) {
    //       return editedElement.editedIngredient;
    //     }
    //     return ingredient;
    //   }
    // );
    // this.ingredientEmitter.next(this.ingredients);

    this.store.dispatch(
      new ShoppingListActions.UpdateIngredient(editedElement)
    );
  }

  removeIngredient(removedElement: EditedIngredient): void {
    // this.ingredients = this.ingredients.filter(
    //   (ingredient: Ingredient, index: number) => {
    //     return index !== removedElement.index;
    //   }
    // );
    // this.ingredientEmitter.next(this.ingredients);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(removedElement.index)
    );
  }
}
