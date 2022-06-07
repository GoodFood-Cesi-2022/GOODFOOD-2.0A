import { loadRecipe } from './../../../shared/store/state/recipe/recipe.actions';
import { selectRecipe } from './../../../shared/store/state/recipe/recipe.selector';
import { RecipeState } from './../../../shared/store/state/recipe/recipe.reducer';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';
import { FormGroup } from '@angular/forms';
import { filter, forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Ingredients } from 'src/app/shared/models/ingredients.model';
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
  form: FormGroup;
  displayModal: boolean;

  recipes: Recipe[] = [];
  recipe: Recipe;
  recipeType: Recipe;
  ingredients: Ingredients[] = [];
  ingredientsTypes: Ingredients[] = [];
  sortOptions: SelectItem[];
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
    private store: Store<RecipeState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //this.recipeService.getRecipes();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
    // var user = this.authService.getAppUser().subscribe();
    // console.log('listes des recettes', user);
    this.initRecipes(this.id);
    this.initIngredients();

    this.recipeService.getRecipes().subscribe((res) => {
      this.recipe = res;
      console.log('==========> recipes : ', res);
    });
  }

  private initRecipes(id: number): Observable<Recipe> {
    return this.recipeService
      .getRecipes()
      .pipe(tap(() => this.initIngredientsAndIngredientsType(id)));
  }
  private initIngredients(): Observable<Ingredients[]> {
    return this.recipeService.getIngredients();
  }
  private initIngredientsAndIngredientsType(id: number): void {
    forkJoin([
      this.recipeService.getIngredientsByRecipeId(id),
      this.recipeService.getIngredientsTypes(),
      this.recipeService.getRecipesType(),
    ]).subscribe((res) => {
      this.ingredients = res[0];
      this.ingredientsTypes = res[1];
      this.recipeType = res[2];
    });
  }

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
  openNew() {
    //this.recipe = {};
    this.submitted = false;
    this.recipeDialog = true;
  }
  // inDisponibility(): void {
  //   const isAvailable = this.form.controls['isAvailable'].value;
  //   Object.keys(this.form.controls).map((key) => {
  //     if (key === 'isAvailable') {
  //     }
  //   });
  // }

  CreateNewRecipe(): void {
    const ref = this.dialogService.open(RecipeDialogComponent, {
      header: 'Ajouter une nouvelle recette',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
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
}
