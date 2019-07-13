import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AppState } from 'src/app/store';
import * as RecipeActions from '../../../store/actions/recipe.action';

import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';

import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, AfterViewInit {
  recipeForm: FormGroup;
  recipe: Recipe;
  recipeSubs: Subscription;
  isChanged: boolean = false;
  isSaveMode: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imagePath: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormArray([])
    });
  }

  ngOnInit() {
    // const recipeId = this.route.snapshot.params.id;
    // this.recipe = this.recipeService.getRecipe(recipeId);
    this.route.data.subscribe((value: Data) => {
      if (value.recipe) {
        this.recipeSubs = value.recipe.subscribe((recipe: Recipe) => {
          this.recipe = recipe;
        });
      }

      if (this.recipe) {
        this.recipeForm.patchValue({
          name: this.recipe.name,
          imagePath: this.recipe.imagePath,
          description: this.recipe.description
        });
        this.setIngredientsArray(this.recipe.ingredients || []);
      } else {
        if (this.router.routerState.snapshot.url !== '/recipes/new') {
          const route = this.router.config.find(r => r.path === 'error');
          route.data.message = 'Recipe you choosed is not existed';
          this.router.navigate(['/error']);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.recipeForm.valueChanges.subscribe((v: any) => {
      this.isChanged = true;
    });
  }

  setIngredientsArray(ings: Ingredient[]): void {
    ings.forEach((ing, index) => {
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          amount: new FormControl(ing.amount, [
            Validators.required,
            Validators.pattern(/^((?!(0))[0-9]*)$/)
          ])
        })
      );
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm);
    this.isSaveMode = true;
    if (this.recipe) {
      // update
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({
          id: this.recipe.id,
          recipe: this.recipeForm.value
        })
      );
      // this.recipeService.updateRecipe(this.recipe.id, this.recipeForm.value);
      // this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      // create
      const value = this.recipeForm.value;
      const newRecipe = new Recipe(
        value.name,
        value.description,
        value.imagePath,
        value.ingredients
      );
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
      this.recipeForm.reset();
      // this.recipeService.addRecipe(newRecipe);
      // this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(new RegExp(/^[1-9]+[0-9]*$/))
        ])
      })
    );
  }

  onDeleteIngredient(index: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  canDeactive(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isChanged && !this.isSaveMode) {
      return this.recipeService.confirm('Discard changes before your leaving?');
    }
    return true;
  }

  trackByFn(index: number, item: Ingredient): string {
    return item.name + index;
  }

  ngOnDestroy(): void {
    if (this.recipeSubs) {
      this.recipeSubs.unsubscribe();
    }
  }
}
