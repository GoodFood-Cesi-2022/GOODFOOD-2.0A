import { TypeVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormArray,
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
      console.log('---> component ---> ingredient type : ', res);
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      allergen: new FormControl(),
      typeIngredient: new FormControl(),
      // typeDetails: this.fb.array([
      //   this.fb.group({
      //     typeIngredient: new FormControl(),
      //     description: [''],
      //   }),
      // ]),
      // infoType: this.fb.group({
      //   typeIngredient: new FormControl(),
      //   description: ['', Validators.minLength(300)],
      // }),
    });
    console.log('forn init : ', this.form);
  }

  isAllergen(event: any): void {
    // console.log(
    //   'ingredient component -> isAllergen -> event.checked',
    //   event.checked
    // );
    this.allergen = event.checked;
    // this.ingredient.allergen = event.checked;
    if (event.checked) {
      this.allergen = true;
      this.form.get('allergen').setValue(true);
    } else {
      this.form.get('allergen').setValue(false);
    }
  }

  /**
   * tableau qui contient la liste des intermediaire dans le formulaire
   * @returns {FormArray}
   */
  get typeDetails(): FormArray {
    return this.form.controls['typeDetails'] as FormArray;
  }

  onSubmit(): void {
    //if (this.form.valid) {
    //this.makeIngredient();
    const ingredient: Ingredient = {
      name: this.form.get('title').value,
      allergen: this.form.get('allergen').value,
      types: this.form.get('typeIngredient').value,
    };
    console.log('res : ', ingredient);
    this.recipeService
      .createIngredient(this.ingredient)
      .pipe()
      .subscribe((res) => console.log('res : ', res));
    // }
  }

  public onClose(): void {}
}
