import { NgModule } from '@angular/core';

import { RecipesComponent } from 'src/app/pages/recipes/recipes.component';
import { RecipeStartComponent } from 'src/app/pages/recipes/recipe-start/recipe-start.component';
import { RecipeListComponent } from 'src/app/pages/recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from 'src/app/pages/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from 'src/app/pages/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/app/pages/recipes/recipe-list/recipe-item/recipe-item.component';

import { CanDeactivateGuard } from './../../guards/can-deactive.guard';
import { RecipePipe } from 'src/app/pipes/recipe.pipe';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipePipe
  ],
  imports: [
    RecipesRoutingModule,
    SharedModule
  ],
  exports: [SharedModule],
  providers: [CanDeactivateGuard]
})
export class RecipesModule {}
