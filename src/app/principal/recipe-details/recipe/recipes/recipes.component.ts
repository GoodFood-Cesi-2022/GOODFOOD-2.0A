import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Picture } from 'src/app/shared/models/picture.model';
import { IngreType } from 'src/app/shared/models/ingredient-type.model';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [DialogService, MessageService],
  styles: [
    `
      :host ::ng-deep .p-button {
        margin: 0 0.5rem 0 0;
        min-width: 10rem;
      }
      p {
        margin: 0;
      }
      .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host ::ng-deep .p-dialog .p-button {
        min-width: 6rem;
      }
    `,
  ],
})
export class RecipesComponent implements OnInit {
  ref: DynamicDialogRef;

  recipes: Recipe[] = [];
  recipesType: Recipe[] = [];
  ingredients: Ingredient[] = [];
  ingredientType: IngreType[] = [];
  pictures: Picture[] = [];

  sortOrder: number;
  sortField: string;
  recipeDialog: boolean;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private confirmationService: ConfirmationService,
    private loading: LoadingService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    //NOSONAR
  }

  ngOnInit() {
    this.loading.loadingOn();

    this.recipeService
      .getRecipes()
      .pipe(finalize((): void => this.loading.loadingOff()))
      .subscribe((recipes: Recipe[]): void => {
        this.recipes = recipes;
      });
  }

  onSortChange(event) {
    // https://www.tektutorialshub.com/angular/property-value-does-not-exist-on-type-eventtarget-error-in-angular/
    let value = (event.target as HTMLTextAreaElement).value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onChangeValue(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  /**
   * Create new recipe button : DYNAMIC DIALOG
   */
  CreateNewRecipe(): void {
    const ref = this.dialogService.open(RecipeDialogComponent, {
      header: 'Ajouter une nouvelle recette',
      width: '70%',
      styleClass: 'DynamicDialog',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        mode: 'CREATE',
        recipe: [],
        recipeType: [],
        ingredientsTypes: [],
        ingredients: [],
        pictures: [],
      },
    });
    ref.onClose.subscribe((recipe: Recipe) => {
      if (recipe) {
        this.recipes = [...this.recipes];
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'La recette est bien crée.',
        });
      }
    });
  }

  /**
   * @params id recipe
   * Suppresssion d'une recette
   * Le message d'alerte de suppression
   * Le message de confirmation de suppression
   */
  deleteRecipe(recipe: Recipe): void {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer la recette "${recipe.name}" ?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'accept',
      accept: () => {
        this.recipeService.deleteRecipe(recipe.id).subscribe({
          next: () => {
            this.recipes = [...this.recipes];
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Cette recette sera supprimé définitivement bientôt.',
              life: 5000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur le moment de suppression de la recette.',
              detail: error.error,
            });
          },
        });
      },
    });
  }

  updateRecipe(recipe: Recipe): void {
    this.ref = this.dialogService.open(RecipeDialogComponent, {
      header: `${recipe.name}`,
      width: '70%',
      styleClass: 'DynamicDialog',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      data: {
        mode: 'UPDATE',
        recipeType: this.recipesType,
        ingredientsTypes: this.ingredientType,
        ingredients: this.ingredients,
        pictures: this.pictures,
        recipe,
      },
    });
    this.ref.onClose.subscribe((_recipe: Recipe) => {
      if (_recipe) {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'La recette est bien modifié.',
        });
      }
    });
  }
}
