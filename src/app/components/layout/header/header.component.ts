import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './../../../services/auth.service';
import { RecipeService } from '../../../services/recipe.service';
import { DataStorageService } from '../../../services/data-storage.service';
import { Recipe } from '../../../models/recipe.model';
import { User } from './../../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(
    private recipeSevice: RecipeService,
    private dataStorageSevice: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.authService.userEmitter.subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(): void {
    const recipes = this.recipeSevice.getRecipes();
    this.dataStorageSevice.storeRecipes(recipes);
  }

  onFetchData(): void {
    this.dataStorageSevice.fetchRecipes().subscribe((recipes: Recipe[]) => {
      console.log(recipes);
      this.recipeSevice.setRecipes(recipes);
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
