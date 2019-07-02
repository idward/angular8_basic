import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { AuthGuardService } from 'src/app/guards/auth.guard';

import { AuthComponent } from 'src/app/pages/auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'auth',
        component: AuthComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthModule {}
