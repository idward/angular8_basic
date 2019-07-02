import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './pages/auth/auth.component';
import { ErrorPageComponent } from './pages/errors/error-page/error-page.component';

import { AuthGuardService } from './guards/auth.guard';
import { SharedModule } from './modules/shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
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
    ErrorPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
