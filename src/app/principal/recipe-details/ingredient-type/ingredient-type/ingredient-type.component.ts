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
  typeArray: IngreType[] = [];
  selectedIngredientType: IngreType[];

  form: FormGroup;

  first: number = 0;

  ingredientTypeDialog: boolean;
  submitted: boolean;

  mode: 'CREATE' | 'UPDATE';

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
    this.initForm();
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

  onSubmit(): void {
    this.submitted = true;

    const ingreType: IngreType = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
    };
    if (this.mode === 'UPDATE') {
      this.ingredientTypeService
        .updateIngredientType(ingreType)
        .pipe()
        .subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Updated',
            life: 3000,
          });
        });
    } else {
      this.ingredientTypeService
        .createIngredientType(ingreType)
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
    this.ingredientTypeDialog = false;
  }

  newIngredientType(): void {
    this.ingreType = {};
    this.submitted = false;
    this.ingredientTypeDialog = true;
  }

  updateIngredientType(ingreType: IngreType): void {
    this.ingreType = { ...ingreType, ...this.form.value };
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
