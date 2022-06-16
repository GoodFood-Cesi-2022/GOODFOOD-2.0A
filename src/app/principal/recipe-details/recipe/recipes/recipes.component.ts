import { loadRecipe } from '../../../../shared/store/state/recipe/recipe.actions';
import { selectRecipe } from '../../../../shared/store/state/recipe/recipe.selector';
import { RecipeState } from '../../../../shared/store/state/recipe/recipe.reducer';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';
import { filter, forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { AuthService } from 'src/app/shared/services/user/auth/auth.service';

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

  // Logique du store pour la récupération des données du réferentiel pour alimenter les listes de choix
  // private recipeStore$ = this.store.pipe(select(selectRecipe)).pipe(
  //   tap((recipe) => {
  //     if (recipe == null) {
  //       this.store.dispatch(loadRecipe());
  //     } else {
  //       console.log('===========> recipes component');
  //     }
  //   })
  // );

  constructor(
    private recipeService: RecipeService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private store: Store<RecipeState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initRecipes();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
    // var user = this.authService.getAppUser().subscribe();
    // console.log('listes des recettes', user);
    //this.initIngredients();
  }

  private initRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      // this.recipes.forEach((e) => e.ingredients);
      // this.recipes.forEach((e) => e.recipe_type);
      // this.recipes.forEach((e) => {
      //   e.ingredients.forEach((x) => {
      //     const _name = x.name;
      //     console.log('e ingredients : ', _name);
      //   });
      // });
      // console.log('-> component -> initRecipes -> recipes : ', recipes);
    });
  }
  // return this.recipeService
  //   .getRecipes()
  //   .pipe(tap(() => this.initIngredientsAndIngredientsType(id)));
  // }
  // private initIngredients(): Observable<Ingredients[]> {
  //   return this.recipeService.getIngredients();
  // }
  // private initIngredientsAndTecipesType(): void {
  //   forkJoin([
  //     this.recipeService.getIngredients(),
  //     this.recipeService.getRecipesType(),
  //   ]).subscribe((res) => {
  //     this.ingredients = res[0];
  //     this.recipesType = res[1];
  //     console.log('----------------------> res[0] :', res[0]);
  //   });
  // }

  // private recipeInit(idUser: number): Observable<Recipe>{
  //   return this.recipeService.getRecipes().pipe(filter(recipes=>recipes.length>=0),tap(()=>this.))
  // }
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
  CreateNewRecipe(): void {
    const ref = this.dialogService.open(RecipeDialogComponent, {
      header: 'Ajouter une nouvelle recette',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        ingredientsTypes: [],
        ingredients: [],
        recipe: [],
      },
    });
    ref.onClose.subscribe((recipe: Recipe) => {
      if (recipe) {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'recipe.name',
        });
      }
    });
  }
  public removeRecipe(recipe: Recipe): void {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer la recette << ${recipe.name} >> ?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'accept',
      accept: () => {
        this.recipeService.removeRecipe(recipe.id).subscribe(
          (message) => {
            const index = this.recipes.indexOf(recipe);
            this.recipes.splice(index, 1);
            this.recipes = [...this.recipes];
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: message,
            });
          },
          (err) =>
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
