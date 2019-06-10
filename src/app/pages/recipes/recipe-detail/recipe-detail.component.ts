import {
  Component,
  OnInit,
  Input,
  AfterContentChecked,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent
  implements OnInit, OnChanges, AfterContentChecked {
  // 父组件向子组件传递数据
  @Input() recipe: Recipe;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterContentChecked(): void {
    console.log('after content checked');
    console.log(this.recipe);
  }

  ngOnInit() {}
}
