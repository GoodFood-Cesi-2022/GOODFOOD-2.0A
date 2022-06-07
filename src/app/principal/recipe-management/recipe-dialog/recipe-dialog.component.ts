import { EndPoints } from './../../../shared/constants/constants';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Recipe, RecipeType } from 'src/app/shared/models/recipe.model';
import { User } from 'src/app/shared/models/user.model';
import { Ingredients, Types } from 'src/app/shared/models/ingredients.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss'],
})
export class RecipeDialogComponent implements OnInit {
  mode: 'UPDATE' | 'CREATE';
  buttonText = 'Modifié' || 'Créer';
  form: FormGroup;
  uploadedFiles: any[] = [];
  //-------------------------------
  recipe: Recipe;
  recipeType: Recipe;
  recipesType: Recipe[] = [];
  //------------------------------- Ingredients details : drop down (1)
  ingredients: Ingredients[] = [];
  ingredientsDetails: Ingredients;
  //------------------------------- Ingredients types : drop down (2)
  ingredientsTypes: Ingredients[] = [];
  types: Ingredients;
  //------------------------------- User & User id
  user: User[] = [];
  idUser: number;
  submitted: boolean;
  //-------------------------------
  //item: string;
  //items: SelectItem[];
  //first = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public messageService: MessageService,
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {
    this.user = config.data.user;
    this.ingredients = config.data.ingredients;
    this.mode = config.data.mode;

    //this.recipe = config.data.recipe;

    if (this.mode === 'CREATE') {
      this.buttonText = EndPoints.CREATE_RECIPE;
    } else {
      // this.ingredient = {
      //   ingredient: this.recipe ? this.recipe.ingredient : '',
      //   userID: this.recipe ? this.recipe.idUser : -1,
      // };
    }
  }

  ngOnInit(): void {
    this.recipeService.getRecipesType().subscribe((res) => {
      this.recipeType = res;
      console.log('+++++++++++> recipe type : ', res);
    });
    /* retrieve ingredients data */
    this.recipeService.getIngredients().subscribe((res) => {
      this.ingredients = res;
      console.log('----------> ingredient : ', res);
    });
    /* retrieve ingredients types */
    this.recipeService.getIngredientsTypes().subscribe((res) => {
      this.ingredientsTypes = res;
      console.log('^^^^^^^^^^^^^ type ingredients : ', res);
    });

    this.initForm();
  }

  // private initIngredientsAndIngredientsType(id: number): void {
  //   forkJoin([
  //     this.recipeService.getIngredientsByRecipeId(id),
  //     this.recipeService.getIngredientsTypes(),
  //     this.recipeService.getRecipesType(),
  //   ]).subscribe((res) => {
  //     this.ingredients = res[0];
  //     this.ingredientsTypes = res[1];
  //     this.recipeType = res[2];
  //   });
  // }
  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      recipeType: [this.recipeType],
      base_price: ['', [Validators.required]],
      ingredientsDetails: [this.ingredientsDetails],
      types: [this.types],
      description: ['', [Validators.required]],
      star: [false, [Validators.required]],
      code: ['', [Validators.required]],
    });
    //if (this.mode === 'CREATE') {
    this.formAddIngredientsDetailsValidators();
    this.formAddIngredientsTypesValidators();
    this.changeStatusIngredientsDetails('CREATE');
    this.changeStatusIngredientsTypes('CREATE');
    // } else {
    // console.log('En attend de la partie update une recette.');
    // }
  }

  private formAddRecipesTypeValidators(): void {
    this.form.get('recipeType').clearValidators();
    this.form.get('recipeType').updateValueAndValidity();
  }
  private formAddIngredientsDetailsValidators(): void {
    this.form.get('ingredientsDetails').clearValidators();
    this.form.get('ingredientsDetails').updateValueAndValidity();
  }
  private formAddIngredientsTypesValidators(): void {
    this.form.get('types').clearValidators();
    this.form.get('types').updateValueAndValidity();
  }

  private changeStatusRecipesType(mode: string): void {
    if (mode === 'CREATE') {
      this.form.controls['recipeType'].enable();
    } else {
      this.form.controls['recipeType'].disable();
    }
  }
  private changeStatusIngredientsDetails(mode: string): void {
    if (mode === 'CREATE') {
      this.form.controls['ingredientsDetails'].enable();
    } else {
      this.form.controls['ingredientsDetails'].disable();
    }
  }
  private changeStatusIngredientsTypes(mode: string): void {
    if (mode === 'CREATE') {
      this.form.controls['types'].enable();
    } else {
      this.form.controls['types'].disable();
    }
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  }

  private makeRecipe(): void {
    if (this.mode === 'CREATE') {
      this.recipe.recipe_type =
        this.form.controls['recipeType'].value.recipeType;
      this.recipe.ingredients =
        this.form.controls['ingredientsDetails'].value.ingredientsDetails;

      // this.recipe.ingredients =
      //   this.form.controls['ingredientsDetails'].value.ingredients;
    }
    // this.recipe.id = this.form.controls['id'].value;
    this.recipe.name = this.form.controls['name'].value;
    this.recipe.description = this.form.controls['description'].value;
    this.recipe.base_price = this.form.controls['base_price'].value;
    this.recipe.star = this.form.controls['star'].value;

    //this.recipe.user = [];

    // this.form['user'].value.forEach((element) => {
    //   this.recipe.user.push(element);
    // });
    console.log('makeRecipe > recipe dialog component');
  }

  onSubmit(): void {
    //if (this.form.valid) {
    this.makeRecipe();
    if (this.mode === 'CREATE') {
      this.recipeService
        .createRecipe(this.recipe)
        .pipe()
        .subscribe((res) => this.ref.close(res));
    }
    //}
  }

  public onClose(): void {
    this.ref.close();
  }

  public checkError(controlName: string, errorName: string): boolean {
    return (
      this.form.controls[controlName].dirty &&
      this.form.controls[controlName].hasError(errorName)
    );
  }
  // const ref = this.dialogService.open(RecipeDialogComponent, {
  //   header: 'Ajouter une nouvelle recette',
  //   width: '70%',
  //   data: {
  //     mode: 'CREATE',
  //     user: this.user,
  //     recipe: { ID: this.userID, user: [] },
  //   },
  //   contentStyle: { 'max-height': '500px', overflow: 'auto' },
  //   baseZIndex: 10000,
  // });

  // ref.onClose.subscribe((recipe: Recipe) => {
  //   if (recipe) {
  //     this.recipes.unshift(recipe);
  //     this.recipes = [...this.recipes];

  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Succès',
  //       detail: 'recipe.name',
  //     });
  //   }
  // });
  // }
}
