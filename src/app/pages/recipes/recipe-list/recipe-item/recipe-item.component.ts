import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild,
  Output,
  EventEmitter
} from '@angular/core';
import { Recipe } from '../../../../models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
// OnChanges,
// DoCheck,
// AfterContentInit,
// AfterContentChecked,
// AfterViewInit,
// AfterViewChecked,
export class RecipeItemComponent implements OnInit {
  // 父组件向子组件传递数据
  @Input('recipeItem') recipe: Recipe;
  // @ViewChild 和 @ContentChild 的区别
  // @ViewChild 用于指定一个元素 在AfterViewInit中被实现
  // @ContentChild 和ng-content配合使用 用于指定一个组件,
  // 在AfterContentInit中被实现
  @ViewChild('heading', { static: true }) h: ElementRef;

  constructor(private recipeService: RecipeService) {}

  selectRecipe(recipe: Recipe): void {
    this.recipeService.recipeEvt.emit(recipe);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('change');
  //   console.log(changes);
  // }

  ngOnInit() {}

  // ngDoCheck(): void {
  //   console.log('do check');
  // }

  // ngAfterContentInit(): void {
  //   console.log('after content init');
  //   console.log('heading:', this.h.nativeElement.textContent);
  // }

  // ngAfterContentChecked(): void {
  //   console.log('after content checked');
  // }

  // ngAfterViewInit(): void {
  //   console.log('after view init');
  //   console.log('heading:', this.h.nativeElement.textContent);
  // }

  // ngAfterViewChecked(): void {
  //   console.log('after view checked');
  // }

  // ngOnDestroy(): void {
  //   console.log('destroy');
  // }
}
