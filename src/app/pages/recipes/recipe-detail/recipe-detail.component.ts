import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/store';
import * as ShoppingListActions from '../../../store/actions/shopping-list.action';
import * as RecipeActions from '../../../store/actions/recipe.action';

import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeSubs: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.data.subscribe((value: Data) => {
      this.recipeSubs = value.recipe.subscribe((recipe: Recipe) => {
        console.log(recipe);
        this.recipe = recipe;
      });

      if (!this.recipe) {
        const route = this.router.config.find(r => r.path === 'error');
        route.data.message = 'Recipe you choosed is not existed';
        this.router.navigate(['/error']);
      }
    });
    // this.route.data.subscribe((value: Data) => {
    //   this.recipe = value.recipe;

    //   if (!this.recipe) {
    //     const route = this.router.config.find(r => r.path === 'error');
    //     route.data.message = 'Recipe you choosed is not existed';
    //     this.router.navigate(['/error']);
    //   }
    // });
    // this.route.params.subscribe((params: Params) => {
    //   this.recipe = this.recipeService.getRecipe(params.id);

    //   if (!this.recipe) {
    //     const route = this.router.config.find(r => r.path === 'error');
    //     route.data.message = 'Recipe you choosed is not existed';
    //     this.router.navigate(['/error']);
    //   }
    // });
  }

  addIngredients(): void {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onRecipeEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onRecipeDelete(): void {
    if (window.confirm('Are you sure to delete this recipe?')) {
      this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipe.id));
      // this.recipeService.deleteRecipe(this.recipe.id);
      // this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  trackByFn(index: number, item: Ingredient): string {
    return item.name + index;
  }

  ngOnDestroy(): void {
    if (this.recipeSubs) {
      this.recipeSubs.unsubscribe();
    }
  }
}
