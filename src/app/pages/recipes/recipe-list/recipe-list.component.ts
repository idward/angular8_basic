import { Subscription } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  encapsulation: ViewEncapsulation.None // 全局样式 Global
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubcription: Subscription;
  filterName: string = 'name';
  filterKey: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubcription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  onRecipeNew(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipeSubcription.unsubscribe();
  }
}
