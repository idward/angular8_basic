import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name', { static: true }) nameRef: ElementRef;
  @ViewChild('amount', { static: true }) amountRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  addIngredient(): void {
    const name = this.nameRef.nativeElement.value;
    const amount = +this.amountRef.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(ingredient);
  }
}
