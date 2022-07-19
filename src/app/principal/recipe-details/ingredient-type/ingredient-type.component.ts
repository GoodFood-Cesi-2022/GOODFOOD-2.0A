import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessageService, ConfirmationService } from 'primeng/api';

import { IngreType } from 'src/app/shared/models/ingredient-type.model';
import { IngredientTypeService } from 'src/app/shared/services/ingredient-type/ingredient-type.service';

@Component({
  selector: 'app-ingredient-type',
  templateUrl: './ingredient-type.component.html',
  styleUrls: ['./ingredient-type.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class IngredientTypeComponent implements OnInit {
  ingreType: IngreType;
  typeArray: IngreType[] = [];

  form: FormGroup;

  first: number = 0;

  ingredientTypeDialog: boolean;
  submitted: boolean;

  constructor(
    private ingredientTypeService: IngredientTypeService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.init();
    this.initForm();
  }

  init(): void {
    /* retrieve ingredient types */
    this.ingredientTypeService.getIngredientsTypes().subscribe((res) => {
      this.typeArray = res;
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.ingreType?.name || '', Validators.required],
      description: this.ingreType?.description || '',
    });
  }

  private makeIngredientType(): void {
    let ingreType: IngreType = {};

    ingreType.name = this.form.get('name').value;
    ingreType.description = this.form.get('description').value;

    this.ingreType = ingreType;
  }

  onSubmit(): void {
    this.submitted = true;
    this.makeIngredientType();
    if (this.ingreType.id) {
      this.ingredientTypeService
        .updateIngredientType(this.ingreType)
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: "Le type d'ingrédient est bien modifié.",
            life: 3000,
          });
        });
    } else {
      this.ingredientTypeService
        .createIngredientType(this.ingreType)
        .subscribe((res) => {
          console.log('res : ', res);
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: "le type d'ingrédient est bien créé.",
            life: 3000,
          });
        });
    }

    this.typeArray = [...this.typeArray];
    this.ingredientTypeDialog = false;
    this.ingreType = {};
  }

  newIngredientType(): void {
    this.ingreType = {};
    this.initForm();
    this.submitted = false;
    this.ingredientTypeDialog = true;
  }

  updateIngredientType(ingreType: IngreType): void {
    this.ingreType = { ...ingreType };
    this.initForm();
    this.submitted = false;
    this.ingredientTypeDialog = true;
  }

  deleteIngredientType(ingreType: IngreType): void {
    this.confirmationService.confirm({
      message: 'Etes-vous sûre de vouloir supprimer "' + ingreType.name + '"?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'accept',
      accept: (): void => {
        this.ingredientTypeService
          .deleteIngredientType(ingreType.id)
          .subscribe({
            next: () => {
              this.typeArray = [...this.typeArray];
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: "Création de type d'ingredient",
                life: 3000,
              });
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur le moment de création de type',
                detail: error.error,
              });
              console.log('erreur le moment de création type --->', error);
            },
          });
      },
    });
  }

  hideDialog(): void {
    this.ingredientTypeDialog = false;
    this.submitted = false;
  }
}
