import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  encapsulation: ViewEncapsulation.None // 全局样式 Global
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'This is my recipe 1',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg'
    )
  ];
  // 子组件向父组件传递数据
  @Output('recipeSelected')
  recipeSelectedEvt: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit() {}

  selectRecipe(recipe: Recipe): void {
    this.recipeSelectedEvt.emit(recipe);
  }
}
