import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from 'src/app/pages/recipes/recipes.component';
import { RecipeStartComponent } from 'src/app/pages/recipes/recipe-start/recipe-start.component';
import { RecipeListComponent } from 'src/app/pages/recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from 'src/app/pages/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from 'src/app/pages/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/app/pages/recipes/recipe-list/recipe-item/recipe-item.component';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipePipe } from 'src/app/pipes/recipe.pipe';
import { DropdownDirective } from 'src/app/directives/dropdown.directive';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipePipe,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ],
  exports: [DropdownDirective]
})
export class RecipesModule {}
