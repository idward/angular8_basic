import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './pages/errors/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: './modules/recipes/recipes.module#RecipesModule'
  },
  {
    path: 'shopping-list',
    loadChildren: './modules/shopping-list/shopping-list.module#ShoppingListModule'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: { message: 'Page not found' }
  },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
