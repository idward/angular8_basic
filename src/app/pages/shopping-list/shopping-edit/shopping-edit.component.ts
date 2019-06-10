import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name', { static: true }) nameRef: ElementRef;
  @ViewChild('amount', { static: true }) amountRef: ElementRef;
  @Output('addIngredient')
  addIngredientEvt: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit() {}

  addIngredient(): void {
    const name = this.nameRef.nativeElement.value;
    const amount = +this.amountRef.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.addIngredientEvt.emit(ingredient);
  }
}
