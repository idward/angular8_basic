import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { ShoppingListStore } from './../../store/reducers/shopping-list.reducer';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<ShoppingListStore>;
  ingredientSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: ShoppingListStore }>
  ) {}

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientSub = this.shoppingListService.ingredientEmitter.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.ingredients = this.store.select('shoppingList');
  }

  onEdit(index: number): void {
    this.shoppingListService.startEditEmitter.next({
      index,
      editedIngredient: this.ingredients[index]
    });
  }

  trackByFn(index: number, item: Ingredient): string {
    return item.name + index;
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }
}
