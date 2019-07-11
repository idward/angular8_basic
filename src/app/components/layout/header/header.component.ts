import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from './../../../store/index';
import { AuthState } from './../../../store/reducers/auth.reducer';
import { RecipeState } from '../../../store/reducers/recipe.reducer';
import * as RecipeActions from '../../../store/actions/recipe.action';

import { AuthService } from './../../../services/auth.service';
import { RecipeService } from '../../../services/recipe.service';
import { DataStorageService } from '../../../services/data-storage.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  recipes: Recipe[];
  userSubs: Subscription;
  recipeSubs: Subscription;

  constructor(
    private recipeSevice: RecipeService,
    private dataStorageSevice: DataStorageService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // this.userSub = this.authService.userEmitter.subscribe((user: User) => {
    //   this.isAuthenticated = !!user;
    // });
    this.userSubs = this.store.select('auth').subscribe((data: AuthState) => {
      this.isAuthenticated = !!data.user;
    });

    this.recipeSubs = this.store
      .select('recipes')
      .subscribe((data: RecipeState) => {
        this.recipes = data.recipes;
      });
  }

  onSaveData(): void {
    // const recipes = this.recipeSevice.getRecipes();
    // this.dataStorageSevice.storeRecipes(recipes);
    this.store.dispatch(new RecipeActions.SetRecipes(this.recipes));
  }

  onFetchData(): void {
    // this.dataStorageSevice.fetchRecipes().subscribe((recipes: Recipe[]) => {
    //   console.log(recipes);
    //   this.recipeSevice.setRecipes(recipes);
    // });
    this.store.dispatch(new RecipeActions.FetchRecipesStart());
  }

  onLogout(): void {
    this.authService.logout();
    // this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }

    if (this.recipeSubs) {
      this.recipeSubs.unsubscribe();
    }
  }
}
