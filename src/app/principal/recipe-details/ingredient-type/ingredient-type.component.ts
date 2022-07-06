import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientTypeService } from 'src/app/shared/services/ingredient-type/ingredient-type.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IngreType } from 'src/app/shared/models/ingredient-type.model';

@Component({
  selector: 'app-ingredient-type',
  templateUrl: './ingredient-type.component.html',
  styleUrls: ['./ingredient-type.component.scss'],
})
export class IngredientTypeComponent implements OnInit {
  ingreType: IngreType;
  typeArray: IngreType[];

  form: FormGroup;

  first: number = 0;

  ingredientTypeDialog: boolean;
  submitted: boolean;

  isCreate: boolean;

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
      name: [
        this.ingreType?.name || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]'),
        ],
      ],
      description: this.ingreType?.description || '',
    });
  }

  private makeIngreType(): void {
    var ingreType: IngreType = {};
    if (this.isCreate) {
      ingreType.name = this.form.get('name').value;
      ingreType.description = this.form.get('description').value;
    } else {
      ingreType.id = this.ingreType.id;
      ingreType.name = this.form.get('name').value;
      ingreType.description = this.form.get('description').value;
    }

    this.ingreType = ingreType;
    console.log('make Ingredient type --->', this.ingreType);
  }

  onSubmit(): void {
    this.submitted = true;
    this.makeIngreType();

    if (this.ingreType.id) {
      this.ingredientTypeService
        .updateIngredientType(this.ingreType)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: "Mise à jour de type d'ingredient",
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur le moment de modification de type',
              detail: error.error,
            });
            console.log('erreur le moment de modification type --->', error);
          },
        });
    } else {
      this.ingredientTypeService
        .createIngredientType(this.ingreType)
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
        this.ingredientTypeService.removeIngredientType(ingreType.id).subscribe(
          (message: string) => {
            const index = this.typeArray.indexOf(ingreType);
            this.typeArray.splice(index, 1);
            this.typeArray = [...this.typeArray];
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
    this.ingredientTypeDialog = false;
    this.submitted = false;
  }
}
