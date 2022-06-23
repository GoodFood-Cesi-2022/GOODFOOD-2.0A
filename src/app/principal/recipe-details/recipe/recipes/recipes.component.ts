import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';

import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';

import { Store } from '@ngrx/store';
import { RecipeState } from '../../../../shared/store/state/recipe/recipe.reducer';

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
  displayModal: boolean;

  recipes: Recipe[] = [];
  recipesType: Recipe[] = [];
  ingredients: Ingredient[] = [];

  sortOptions: SelectItem[] = [];
  sortOrder: number;
  sortField: string;

  submitted: boolean;
  recipeDialog: boolean;
  sortKey: string;
  id: number;
  first = 0;
  idUser: number;

  constructor(
    private recipeService: RecipeService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loading: LoadingService,
    private store: Store<RecipeState>
  ) {}

  ngOnInit() {
    this.initRecipes();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  private initRecipes(): void {
    this.loading.loadingOn();

    this.recipeService
      .getRecipes()
      .pipe(finalize(() => this.loading.loadingOff()))
      .subscribe((recipes) => {
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
        recipe: [],
        recipeType: [],
        ingredientsTypes: [],
        ingredients: [],
        pictures: [],
      },
    });
    ref.onClose.subscribe((recipe: Recipe) => {
      if (recipe) {
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
  public removeRecipe(recipe: Recipe): void {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer la recette "${recipe.name}" ?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'accept',
      accept: () => {
        this.recipeService.removeRecipe(recipe.id).subscribe(
          (message: string) => {
            const index = this.recipes.indexOf(recipe);
            this.recipes.splice(index, 1);
            this.recipes = [...this.recipes];
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: message,
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
}
