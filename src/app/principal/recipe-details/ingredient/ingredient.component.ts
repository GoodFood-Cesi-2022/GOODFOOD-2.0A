import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";

import { MessageService, ConfirmationService } from "primeng/api";

import { Ingredient } from "src/app/shared/models/ingredient.model";
import { IngreType } from "src/app/shared/models/ingredient-type.model";
import { IngredientService } from "src/app/shared/services/ingredient/ingredient.service";
import { IngredientTypeService } from "src/app/shared/services/ingredient-type/ingredient-type.service";

@Component({
  selector: "app-ingredient",
  templateUrl: "./ingredient.component.html",
  styleUrls: ["./ingredient.component.scss"],
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

  ingredient: Ingredient;

  typeArray: IngreType[] = [];
  ingredientType: IngreType;

  ingredients: Ingredient[] = [];

  allergen: boolean;
  ingredientDialog: boolean;
  submitted: boolean;

  first: number = 0;

  id: number;
  isCreate: boolean;

  constructor(
    private ingredientService: IngredientService,
    private ingredientTypeService: IngredientTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.init();
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
      name: [this.ingredient?.name || "", [Validators.required]],
      allergen: this.ingredient?.allergen || false,
      ingredientType: this.ingredient?.types || new FormControl([]),
    });
  }

  private makeRecipe(): void {
    const ingredient: Ingredient = {};
    if (this.isCreate) {
      ingredient.name = this.form.get("name").value;
      ingredient.allergen = this.form.get("allergen").value;
      ingredient.types = [this.form.controls["ingredientType"].value.code];
    } else {
      ingredient.id = this.ingredient.id;
      ingredient.name = this.form.get("name").value;
      ingredient.allergen = this.form.get("allergen").value;
    }
    this.ingredient = ingredient;
  }

  newIngredient(): void {
    this.ingredient = {};
    this.isCreate = true;
    this.initForm();
    this.submitted = false;
    this.ingredientDialog = true;
  }

  updateIngredient(ingredient: Ingredient): void {
    this.ingredient = { ...ingredient };
    this.isCreate = false;
    this.initForm();
    this.submitted = false;
    this.ingredientDialog = true;
  }

  onSubmit(): void {
    this.submitted = true;
    this.makeRecipe();

    if (this.ingredient.id) {
      this.ingredientService.updateIngredient(this.ingredient).subscribe({
        next: () => {
          this.messageService.add({
            severity: "success",
            summary: "Succès",
            detail: "Mise à jour d'ingredient",
            life: 3000,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur le moment de modification",
            detail: error.error,
          });
        },
      });
    } else {
      this.ingredientService.createIngredient(this.ingredient).subscribe({
        next: () => {
          this.messageService.add({
            severity: "success",
            summary: "Succès",
            detail: "Nouvel ingredient ajouté",
            life: 3000,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur le moment de création",
            detail: error.error,
          });
        },
      });
    }
    this.ingredientDialog = false;
    this.ingredients = [...this.ingredients, this.ingredient];
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.confirmationService.confirm({
      message: 'Etes-vous sûre de vouloir supprimer "' + ingredient.name + '"?',
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      acceptButtonStyleClass: "accept",
      accept: (): void => {
        this.ingredientService.deleteIngredient(ingredient.id).subscribe({
          next: () => {
            this.ingredients = [...this.ingredients, this.ingredient];
            this.messageService.add({
              severity: "success",
              summary: "Succès",
              detail: "L'ingrédient est supprimé.",
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur le moment de suppression de l'ingrédient!",
              detail: error.error,
            });
          },
        });
      },
    });
  }

  isAllergen(event: any): void {
    this.allergen = event.checked;
    if (event.checked) {
      this.allergen = true;
      this.form.get("allergen").setValue(true);
    } else {
      this.form.get("allergen").setValue(false);
    }
  }

  hideDialog(): void {
    this.ingredientDialog = false;
    this.submitted = false;
  }
}
