import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './pages/auth/auth.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './pages/shopping-list/shopping-edit/shopping-edit.component';
import { ErrorPageComponent } from './pages/errors/error-page/error-page.component';
import { AlertComponent } from './components/alert/alert.component';

import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';

import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent, canActivate: [AuthGuardService] },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: { message: 'Page not found' }
  },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  declarations: [
    AuthComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ErrorPageComponent,
    AlertComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule, PlaceholderDirective],
  entryComponents: [AlertComponent]
})
export class AppRoutingModule {}
