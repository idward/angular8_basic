import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.editSubscription = this.shoppingListService.startEditEmitter.subscribe(
      (data: EditedIngredient) => {
        this.editedIngredient = data.editedIngredient;
        this.editedIndex = data.index;
        this.shoppingForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );
  }

  onSubmit(): void {
    const name = this.shoppingForm.value.name;
    const amount = this.shoppingForm.value.amount;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(ingredient);
    this.shoppingForm.reset();
  }

  onEdit(): void {
    this.editedIngredient.name = this.shoppingForm.value.name;
    this.editedIngredient.amount = this.shoppingForm.value.amount;
    const editedIngredient = {
      index: this.editedIndex,
      editedIngredient: this.editedIngredient
    };
    this.shoppingListService.editIngredient(editedIngredient);
    this.editedIngredient = null;
    this.shoppingForm.reset();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
