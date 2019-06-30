import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from 'src/app/guards/auth-guard.service';

import { RecipesComponent } from 'src/app/pages/recipes/recipes.component';
import { RecipeStartComponent } from 'src/app/pages/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/app/pages/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from 'src/app/pages/recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
