import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((value: Data) => {
      this.recipe = value.recipe;

      if (!this.recipe) {
        const route = this.router.config.find(r => r.path === 'error');
        route.data.message = 'Recipe you choosed is not existed';
        this.router.navigate(['/error']);
      }
    });
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
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onRecipeEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onRecipeDelete(): void {
    if (window.confirm('Are you sure to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.recipe.id);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
