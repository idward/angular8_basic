import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';

import { ShoppingListComponent } from 'src/app/pages/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/app/pages/shopping-list/shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    RouterModule.forChild([
      { path: 'shopping-list', component: ShoppingListComponent }
    ]),
    SharedModule
  ],
  exports: [RouterModule]
})
export class ShoppingListModule {}
