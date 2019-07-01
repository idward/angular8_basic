import { Injectable } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(recipes: Recipe[]): void {
    this.http
      .put<Recipe[]>(
        'https://angular-http-e4f15.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(recipes => {
        console.log(recipes);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      'https://angular-http-e4f15.firebaseio.com/recipes.json'
    );
  }
}
