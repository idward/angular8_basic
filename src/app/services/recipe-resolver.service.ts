import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, delay } from 'rxjs/operators';

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
  ): Observable<any> {
    // return this.recipeService.getRecipe(route.params.id);
    // return this.store.select('recipes').pipe(
    //   switchMap((recipesStore: RecipeState) => {
    //     // const recipe = recipesStore.recipes.find(
    //     //   (recipe: Recipe) => recipe.id === route.params.id
    //     // );
    //     // return of(recipe);
    //   })
    // );
    return of(
      this.store.select('recipes').pipe(
        map(recipeStore => {
          return recipeStore.recipes.find(
            recipe => recipe.id === route.params.id
          );
        })
      )
    );
  }
}
