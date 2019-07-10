import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ErrorPageComponent } from './pages/errors/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: () =>
      import('./modules/recipes/recipes.module').then(m => m.RecipesModule)
    // loadChildren: './modules/recipes/recipes.module#RecipesModule'
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./modules/shopping-list/shopping-list.module').then(
        m => m.ShoppingListModule
      )
    // loadChildren: './modules/shopping-list/shopping-list.module#ShoppingListModule'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
    // loadChildren: './modules/auth/auth.module#AuthModule'
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
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      // onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
