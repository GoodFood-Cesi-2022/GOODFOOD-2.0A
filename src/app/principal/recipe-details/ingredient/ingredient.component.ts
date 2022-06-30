import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { IngreType } from 'src/app/shared/models/ingredient-type.model';

import { IngredientService } from 'src/app/shared/services/ingredient/ingredient.service';
import { IngredientTypeService } from 'src/app/shared/services/ingredient-type/ingredient-type.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { first } from 'rxjs/operators';

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
  form: FormGroup;
  allergen: boolean;

  ingredient: Ingredient;
  typeArray: IngreType[] = [];
  ingredientType: IngreType;

  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[];

  ingredientDialog: boolean;
  submitted: boolean;

  first: number = 0;

  id: number;
  isCreate: boolean = true;

  constructor(
    private ingredientService: IngredientService,
    private ingredientTypeService: IngredientTypeService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.init();
    this.isCreate = !this.id;
    this.initForm();
  }

  init(): void {
    /* retrieve ingredient */
    this.ingredientService.getIngredients().subscribe((res) => {
      this.ingredients = res;
    });
    /* retrieve ingredient types */
    this.ingredientTypeService.getIngredientsTypes().subscribe((res) => {
      this.typeArray = res;
    });
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
      allergen: this.ingredient?.allergen || false,
      ingredientType: this.ingredient?.types || new FormControl([]),
      // [new FormControl([]), this.isCreate ? this.form.controls['ingredientType'].disable(),
      // { value: new FormControl([]), disabled: !this.isCreate }, //
    });

    if (!this.isCreate) {
      this.ingredientService
        .getIngredient(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }

    // if (this.isCreate) {
    // this.form.get('name').setValue(this.ingredient?.name);
    // this.form.get('allergen').setValue(this.ingredient?.allergen);
    // this.form.controls['ingredientType'].disable();
    // this.form.get('ingredientType').disable();
    // }
  }

  onSubmit(): void {
    // if (this.form.valid) {}
    this.submitted = true;
    this.makeRecipe();

    if (this.ingredient.id) {
      this.ingredientService
        .updateIngredient(this.ingredient)
        .pipe()
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: "Mise à jour d'ingredient",
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur le moment de modification',
              detail: error.error,
            });
          },
        });
    } else {
      this.ingredientService
        .createIngredient(this.ingredient)
        .pipe()
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Nouvel ingredient ajouté',
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur le moment de création',
              detail: error.error,
            });
          },
        });
    }

    this.ingredients = [...this.ingredients];
    this.ingredientDialog = false;
    this.ingredient = {};
  }

  private makeRecipe(): void {
    if (this.isCreate) {
      this.ingredient.name = this.form.get('name').value;
      this.ingredient.allergen = this.form.get('allergen').value;
      this.ingredient.types = [this.form.controls['ingredientType'].value.code];
    } else {
      this.ingredient.name = this.form.get('name').value;
      this.ingredient.allergen = this.form.get('allergen').value;
    }
  }

  newIngredient(): void {
    this.ingredient = {};
    this.submitted = false;
    this.ingredientDialog = true;
  }

  updateIngredient(ingredient: Ingredient): void {
    this.ingredient = { ...ingredient };
    // this.initForm();
    this.form.get('name').setValue(this.ingredient?.name);
    this.form.get('allergen').setValue(this.ingredient?.allergen);
    this.form.controls['ingredientType'].setValue(this.ingredient?.types);
    // this.form.get('ingredientType').disable();
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

  isAllergen(event: any): void {
    this.allergen = event.checked;
    if (event.checked) {
      this.allergen = true;
      this.form.get('allergen').setValue(true);
    } else {
      this.form.get('allergen').setValue(false);
    }
  }

  hideDialog(): void {
    this.ingredientDialog = false;
    this.submitted = false;
  }

  // onRegister(): void {
  //   this.submitted = true;
  //   if (this.mode === 'CREATE') {
  //     this.newIngredient();
  //   } else {
  //     this.update();
  //   }
  //   this.ingredientDialog = false;
  // }

  // update(): void {
  // this.submitted = false;
  //   this.ingredient = { ...this.ingredient };
  //   this.form = this.fb.group({
  //     name: [
  //       this.ingredient?.name,
  //       [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.pattern('[a-zA-Z]'),
  //       ],
  //     ],
  //     allergen: this.ingredient?.allergen || false,
  //     ingredientType: this.ingredient?.types,
  //   });
  //   this.ingredientDialog = true;
  // }
}
