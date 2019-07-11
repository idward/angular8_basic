import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../store';
import { RecipeState } from '../store/reducers/recipe.reducer';

import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe> {
  constructor(
    // private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe> {
    // return this.recipeService.getRecipe(route.params.id);
    return this.store.select('recipes').pipe(
      map((recipesStore: RecipeState) => {
        return recipesStore.recipes.find(
          (recipe: Recipe) => recipe.id === route.params.id
        );
      })
    );
  }
}
