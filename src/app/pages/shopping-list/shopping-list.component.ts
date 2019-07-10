import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { AppState } from './../../store/index';
import { ShoppingListState } from './../../store/reducers/shopping-list.reducer';

import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<ShoppingListState>;
  ingredientSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientSub = this.shoppingListService.ingredientEmitter.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    // Observable<ShoppingListState>
    this.ingredients = this.store.select('shoppingList');
  }

  onEdit(index: number): void {
    // this.shoppingListService.startEditEmitter.next({
    //   index,
    //   editedIngredient: this.ingredients[index]
    // });
    this.shoppingListService.startEditIngredient(index);
  }

  trackByFn(index: number, item: Ingredient): string {
    return item.name + index;
  }

  ngOnDestroy(): void {
    // this.ingredientSub.unsubscribe();
  }
}
