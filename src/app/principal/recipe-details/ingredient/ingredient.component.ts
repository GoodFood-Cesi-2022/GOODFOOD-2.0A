import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { Ingredient, IngreType } from 'src/app/shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent implements OnInit {
  form: FormGroup;
  allergen: boolean;

  ingredient: Ingredient;
  typeArray: IngreType[] = [];
  typeIngredient: IngreType;

  constructor(private recipeService: RecipeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.init();
    this.initForm();
  }

  init(): void {
    /* retrieve ingredient types */
    this.recipeService.getIngredientsTypes().subscribe((res) => {
      this.typeArray = res;
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]'),
        ],
      ],
      allergen: false,
      typeIngredient: new FormControl([]),
    });
  }

  isAllergen(event: any): void {
    this.allergen = event.checked;
    if (event.checked) {
      this.allergen = true;
      this.form.get('allergen').setValue(true);
    } else {
      this.form.get('allergen').setValue(false);
    }
  }

  onSubmit(): void {
    const ingredient: Ingredient = {
      name: this.form.get('name').value,
      allergen: this.form.get('allergen').value,
      types: [this.form.controls['typeIngredient'].value.code],
    };
    console.log('res res : ', ingredient);
    this.recipeService
      .createIngredient(ingredient)
      .pipe()
      .subscribe((res) => console.log('res : ', res));
  }
}
