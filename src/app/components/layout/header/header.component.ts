import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../../../services/recipe.service';
import { DataStorageService } from '../../../services/data-storage.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private recipeSevice: RecipeService,
    private dataStorageSevice: DataStorageService
  ) {}

  ngOnInit() {}

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
}
