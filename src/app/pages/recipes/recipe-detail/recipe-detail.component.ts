import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ShoppingListService } from './../../../services/shopping-list.service';

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
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(params.id);

      if (!this.recipe) {
        // debugger;
        const route = this.router.config.find(r => r.path === 'error');
        route.data.message = 'Recipe you choosed is not existed';
        this.router.navigate(['/error']);
      }
    });
  }

  addIngredients(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onRecipeEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
