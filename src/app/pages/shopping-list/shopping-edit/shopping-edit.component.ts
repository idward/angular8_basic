import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from './../../../store/index';
import { ShoppingListState } from './../../../store/reducers/shopping-list.reducer';

import { ShoppingListService } from 'src/app/services/shopping-list.service';

import { Ingredient } from 'src/app/models/ingredient.model';
import { EditedIngredient } from 'src/app/models/common.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) shoppingForm: NgForm;
  amountPattern: any = /^((?!(0))[0-9]*)$/;
  editedIngredient: Ingredient;
  editedIndex: number;
  editSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // this.editSubscription = this.shoppingListService.startEditEmitter.subscribe(
    //   (data: EditedIngredient) => {
    //     this.editedIngredient = data.editedIngredient;
    //     this.editedIndex = data.index;
    //     this.shoppingForm.setValue({
    //       name: this.editedIngredient.name,
    //       amount: this.editedIngredient.amount
    //     });
    //   }
    // );

    this.editSubscription = this.store
      .select('shoppingList')
      .subscribe((data: ShoppingListState) => {
        this.editedIngredient = data.editedIngredient;
        this.editedIndex = data.indexOfIngredients;
        if (this.editedIngredient) {
          this.shoppingForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          });
        }
      });
  }

  /**
   * 创建shopping-list
   */
  onSubmit(): void {
    const name = this.shoppingForm.value.name;
    const amount = this.shoppingForm.value.amount;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(ingredient);
    this.shoppingForm.reset();
  }

  /**
   * 修改shopping-list
   */
  onEdit(): void {
    const name = this.shoppingForm.value.name;
    const amount = this.shoppingForm.value.amount;
    const ingredient = new Ingredient(name, amount);
    const editedIngredient: EditedIngredient = {
      index: this.editedIndex,
      ingredient
    };
    this.shoppingListService.editIngredient(editedIngredient);
    this.editedIngredient = null;
    this.editedIndex = null;
    this.shoppingForm.reset();
  }

  onClear(): void {
    this.shoppingListService.stopEditIngredient();
    this.shoppingForm.reset();
  }

  onDelete(): void {
    const removedIngredient: EditedIngredient = {
      index: this.editedIndex,
      ingredient: this.editedIngredient
    };
    this.shoppingListService.removeIngredient(removedIngredient);
    this.shoppingForm.reset();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
