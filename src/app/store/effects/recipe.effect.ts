import { HttpClient } from '@angular/common/http';
import { Actions } from '@ngrx/effects';

export class RecipeEffect {
  constructor(private action$: Actions, private http: HttpClient) {}
}
