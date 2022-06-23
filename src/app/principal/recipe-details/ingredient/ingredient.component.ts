import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { IngreType } from 'src/app/shared/models/ingredient-type.model';

import { IngredientService } from 'src/app/shared/services/ingredient/ingredient.service';
import { IngredientTypeService } from 'src/app/shared/services/ingredient-type/ingredient-type.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class IngredientComponent implements OnInit {
  mode: 'CREATE' | 'UPDATE';
  form: FormGroup;
  allergen: boolean;

  ingredient: Ingredient;
  typeArray: IngreType[] = [];
  ingredientType: IngreType;

  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[];

  ingredientDialog: boolean;
  submitted: boolean;

  first = 0;

  constructor(
    private ingredientService: IngredientService,
    private ingredientTypeService: IngredientTypeService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.init();
    this.initForm();
  }

  init(): void {
    /* retrieve ingredient */
    this.ingredientService.getIngredients().subscribe((res) => {
      this.ingredients = res;
      // console.log('component > ingredients : ', res);
    });
    /* retrieve ingredient types */
    this.ingredientTypeService.getIngredientsTypes().subscribe((res) => {
      this.typeArray = res;
      // console.log('component > ingredient-type : ', res);
    });
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [
        this.ingredient?.name || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]'),
        ],
      ],
      allergen: this.ingredient?.allergen || false, //false,
      ingredientType: this.ingredient?.types || [], //new FormControl([]),
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
    this.submitted = true;

    const ingredient: Ingredient = {
      name: this.form.get('name').value,
      allergen: this.form.get('allergen').value,
      types: [this.form.controls['ingredientType'].value.code],
    };
    if (this.mode === 'UPDATE') {
      this.ingredientService
        .updateIngredient(ingredient)
        .pipe()
        .subscribe((res) => {
          console.log('res : ', res);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Updated',
            life: 3000,
          });
        });
    } else {
      this.ingredientService
        .createIngredient(ingredient)
        .pipe()
        .subscribe((res) => {
          console.log('res : ', res);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Created',
            life: 3000,
          });
        });
    }
    this.ingredientDialog = false;
  }

  newIngredient(): void {
    this.ingredient = {};
    this.submitted = false;
    this.ingredientDialog = true;
  }

  // deleteSelectedIngredients(): void {
  //   this.confirmationService.confirm({
  //     message: 'Etes-vous sûre de vouloir supprimer ?',
  //     header: 'Confirmation de suppression',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptButtonStyleClass: 'accept',
  //     accept: (): void => {
  //       //this.ingredientService.removeIngredient(this.ingredient.id).
  //       this.ingredients = this.ingredients.filter(
  //         (val) => !this.selectedIngredients.includes(val)
  //       );
  //       //this.ingredient = {};
  //       this.selectedIngredients = null;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Succès',
  //         detail: 'Ingredient est supprimé',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  updateIngredient(ingredient: Ingredient): void {
    // const formValue = this.form.value;
    // this.ingredient.name=formValue.name;
    // this.ingredient.allergen=formValue.allergen;
    // this.ingredient.types=formValue.types;
    this.ingredient = { ...ingredient, ...this.form.value };
    this.ingredientDialog = true;
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.confirmationService.confirm({
      message: 'Etes-vous sûre de vouloir supprimer "' + ingredient.name + '"?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'accept',
      accept: (): void => {
        this.ingredientService.removeIngredient(ingredient.id).subscribe(
          (message: string) => {
            const index = this.ingredients.indexOf(ingredient);
            this.ingredients.splice(index, 1);
            this.ingredients = [...this.ingredients];
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: message,
              life: 3000,
            });
          },
          (err: any) =>
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: err.error.message,
            })
        );
      },
    });
  }

  hideDialog(): void {
    this.ingredientDialog = false;
    this.submitted = false;
  }
}
