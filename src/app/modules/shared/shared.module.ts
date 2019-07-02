import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from 'src/app/components/alert/alert.component';

import { BasicHighlightDirective } from 'src/app/directives/basic-highlight.directive';
import { BetterHighlightDirective } from 'src/app/directives/better-highlight.directive';
import { UnlessDirective } from 'src/app/directives/unless.directive';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import { DropdownDirective } from 'src/app/directives/dropdown.directive';

@NgModule({
  declarations: [
    AlertComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    PlaceholderDirective,
    AlertComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
