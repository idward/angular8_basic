import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store';
import { RecipeState } from 'src/app/store/reducers/recipe.reducer';

// import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  encapsulation: ViewEncapsulation.None // 全局样式 Global
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesStore: Observable<RecipeState>;
  recipeSubs: Subscription;
  filterName: string = 'name';
  filterKey: string = '';

  constructor(
    // private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    // this.recipeSubs = this.recipeService.recipeChanged.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );

    this.recipesStore = this.store.select('recipes');
  }

  onRecipeNew(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  trackByFn(index: number, item: Recipe): string {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.recipeSubs) {
      this.recipeSubs.unsubscribe();
    }
  }
}
