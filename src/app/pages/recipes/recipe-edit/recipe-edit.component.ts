import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imagePath: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormArray([])
    });
  }

  ngOnInit() {
    const recipeId = this.route.snapshot.params.id;
    this.recipe = this.recipeService.getRecipe(recipeId);

    if (this.recipe) {
      this.recipeForm.patchValue({
        name: this.recipe.name,
        imagePath: this.recipe.imagePath,
        description: this.recipe.description
      });

      this.setIngredientsArray(this.recipe.ingredients);
    }
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
    if (this.recipe) {
      // update
      this.recipeService.updateRecipe(this.recipe.id, this.recipeForm.value);
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      // create
      const value = this.recipeForm.value;
      const newRecipe = new Recipe(
        value.name,
        value.description,
        value.imagePath,
        value.ingredients
      );
      this.recipeService.addRecipe(newRecipe);
      this.recipeForm.reset();
      this.router.navigate(['../'], { relativeTo: this.route });
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
}
