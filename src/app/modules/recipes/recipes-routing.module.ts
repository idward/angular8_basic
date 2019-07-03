import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from 'src/app/guards/auth.guard';
import { CanDeactivateGuard } from 'src/app/guards/can-deactive.guard';
import { RecipeResolverService } from 'src/app/services/recipe-resolver.service';

import { RecipesComponent } from 'src/app/pages/recipes/recipes.component';
import { RecipeStartComponent } from 'src/app/pages/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/app/pages/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from 'src/app/pages/recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    pathMatch: 'full',
    children: [
      { path: '', component: RecipeStartComponent },
      {
        path: 'new',
        component: RecipeEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { recipe: RecipeResolverService }
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { recipe: RecipeResolverService },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
