import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from '../actions/recipe.action';
import { switchMap, map } from 'rxjs/operators';

import { Recipe } from 'src/app/models/recipe.model';

export class RecipeEffect {
  constructor(private action$: Actions, private http: HttpClient) {}

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
}
