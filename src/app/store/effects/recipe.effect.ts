import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from '../actions/recipe.action';
import { switchMap, map, tap } from 'rxjs/operators';

import { Recipe } from 'src/app/models/recipe.model';
import { of } from 'rxjs';

export class RecipeEffect {
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Effect()
  setRecipes = this.action$.pipe(
    ofType(RecipeActions.SET_RECIPES),
    switchMap((recipesData: RecipeActions.SetRecipes) => {
      return this.http.put<Recipe[]>(
        'https://angular-http-e4f15.firebaseio.com/recipes.json',
        recipesData.payload
      );
    })
  );

  @Effect()
  fetchRecipes = this.action$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>('https://angular-http-e4f15.firebaseio.com/recipes.json')
        .pipe(
          map(recipesData => {
            return new RecipeActions.FetchRecipes(recipesData);
          })
        );
    })
  );

  @Effect()
  addRecipe = this.action$.pipe(
    ofType(RecipeActions.ADD_RECIPE),
    switchMap((recipeData: RecipeActions.AddRecipe) => {
      return of(new RecipeActions.AddRecipeSuccess());
    })
  );

  @Effect()
  updateReicpe = this.action$.pipe(
    ofType(RecipeActions.UPDATE_RECIPE),
    switchMap((recipeData: RecipeActions.UpdateRecipe) => {
      return of(new RecipeActions.UpdateRecipeSuccess());
    })
  );

  @Effect()
  deleteRecipe = this.action$.pipe(
    ofType(RecipeActions.DELETE_RECIPE),
    switchMap((recipeData: RecipeActions.DeleteRecipe) => {
      return of(new RecipeActions.DeleteRecipeSuccess());
    })
  );

  @Effect({ dispatch: true })
  recipeRedirect = this.action$.pipe(
    ofType(
      RecipeActions.DELETE_RECIPE_SUCCESS,
      RecipeActions.ADD_RECIPE_SUCCESS,
      RecipeActions.UPDATE_RECIPE_SUCCESS
    ),
    tap(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  );
}
