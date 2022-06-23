
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeType } from 'src/app/shared/models/recipe-type.model';
import { User } from 'src/app/shared/models/user.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Picture } from '../../../../shared/models/picture.model';

import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { IngredientService } from 'src/app/shared/services/ingredient/ingredient.service';

import { EndPoints } from '../../../../shared/constants/constants';


@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: [ './recipe-dialog.component.scss' ],
})
export class RecipeDialogComponent implements OnInit {
  mode: 'UPDATE' | 'CREATE';
  Textbutton = 'Modifier' || 'Créer';
  form: FormGroup;
  //------------------------------- Recipe Type : dropdown (1)
  recipesType: Recipe[] = [];
  recipe: Recipe;
  recipeType: RecipeType;
  //------------------------------- Ingredients details : drop down (2)
  ingredients: Ingredient[] = [];
  ingredientsDetails: Ingredient;

  picture: Picture = null; // Variable to store picture

  user: User[] = [];
  idUser: number;
  submitted: boolean;

  idRecipe: number;
  star: boolean;

  uploadedFiles: any[] = []; // Upload image

  isDisabledControlForm = false;

  fr: any;

  constructor (
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private messageService: MessageService,
    private recipeService: RecipeService,
    private ingredientService: IngredientService
  ) {
    this.user = config.data.user;
    this.recipe = config.data.recipe;
    this.ingredients = config.data.ingredients;
    this.mode = config.data.mode;

    if(this.mode === 'UPDATE') {
      this.isDisabledControlForm = true;
      this.Textbutton = EndPoints.EDIT_RECIPE;
      // this.recipeType = {
      //   code: this.recipe ? this.recipe.recipe_type : '',
      //   idRecipe: this.recipe ? this.recipe.id : -1,
      // };
      // this.ingredientsDetails = {
      //   name: this.recipe ? this.recipe.ingredients.forEach((x) => x.name) : '',
      // };
    } else {
      this.Textbutton = EndPoints.CREATE_RECIPE;
    }
  }

  ngOnInit (): void {


    /* retrieve recipe types */
    this.recipeService.getRecipesType().subscribe((res) => {
      this.recipesType = res;
      console.log('recipe type in component : ', res);
    });
    /* retrieve ingredients data */
    this.ingredientService.getIngredients().subscribe((res) => {
      this.ingredients = res;
      console.log('ingredient in component : ', res);
    });

    this.initForm();
  }

  initForm (): void {

    this.form = this.fb.group({
      title: [ '', [ Validators.required ] ],
      recipeType: new FormControl(),
      price: [ '', [ Validators.required ] ],
      ingredientsDetails: new FormControl(),
      description: [ '' ],
      star: false,
      availableDate: [ '', [ Validators.required ] ],
    });

    if(this.mode === 'UPDATE') {
      this.formRemoveRecipeTypeValidators();
      this.formRemoveIngredientsDetailsValidators();
      this.changeStatusRecipeType('UPDATE');
      this.changeStatusIngredientsDetails('UPDATE');

    } else {
      this.formAddRecipeTypeValidators();
      this.formAddIngredientsDetailsValidators();
      this.changeStatusRecipeType('CREATE');
      this.changeStatusIngredientsDetails('CREATE');

      console.log('En attend de la partie update d\'une recette.');
    }
  }

  private formRemoveRecipeTypeValidators (): void {
    this.form.get('recipeType').clearValidators();
    this.form.get('recipeType').updateValueAndValidity();
  }
  private formRemoveIngredientsDetailsValidators (): void {
    this.form.get('ingredientsDetails').clearValidators();
    this.form.get('ingredientsDetails').updateValueAndValidity();
  }
  private formAddRecipeTypeValidators (): void {
    this.form.get('recipeType').setValidators([ Validators.required ]);
    this.form.get('recipeType').updateValueAndValidity();
  }
  private formAddIngredientsDetailsValidators (): void {
    this.form.get('ingredientsDetails').setValidators([ Validators.required ]);
    this.form.get('ingredientsDetails').updateValueAndValidity();
  }
  private changeStatusRecipeType (mode: string): void {
    if(mode === 'UPDATE') {
      this.form.controls[ 'recipeType' ].disable();
    } else {
      this.form.controls[ 'recipeType' ].enable();
    }
  }
  private changeStatusIngredientsDetails (mode: string): void {
    if(mode === 'UPDATE') {
      this.form.controls[ 'ingredientsDetails' ].disable();
    } else {
      this.form.controls[ 'ingredientsDetails' ].enable();
    }
  }

  onClickStar (event: any): void {
    this.star = event.checked;
    this.recipe.star = event.checked;
    if(event.checked) {
      this.star = true;
      this.form.get('star').setValue(true);
    } else {
      this.form.get('star').setValue(false);
    }
  }

  private makeRecipe (): void {
    if(this.mode === 'CREATE') {
      this.recipe.name = this.form.value.title;
      this.recipe.recipe_type = this.form.controls[ 'recipeType' ].value.code;
      this.recipe.base_price = this.form.value.price;
      this.recipe.ingredients = this.form.controls[ 'ingredientsDetails' ].value;
      this.recipe.star = this.form.value.star;
      this.recipe.available_at = this.form.value.availableDate;
      this.recipe.description = this.form.value.description;
    }
  }

  public onSubmit (): void {
    if(this.form.valid) {

      this.makeRecipe();

      if(this.mode === 'CREATE') {
        this.recipeService.uploadPicture(this.picture).subscribe((res) => {
          this.picture = res;
          this.recipeService
            .createRecipe(this.recipe)
            .pipe()
            .subscribe((res) => {
              this.ref.close(res);
              this.recipe = res;
              this.recipeService
                .attachPictures(this.picture, this.recipe)
                .pipe()
                .subscribe();
              (err) =>
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erreur',
                  detail: err.error.message,
                });
            });
        });
      }
      //else {
      //   this.recipeService.uploadPicture(this.picture).subscribe((res) => {
      //     this.picture = res;
      //     this.recipeService
      //       .updateRecipe(this.recipe)
      //       .pipe()
      //       .subscribe((res) => {
      //         this.ref.close(res);
      //         this.recipeService
      //           .attachPictures(this.picture, this.recipe)
      //           .pipe()
      //           .subscribe();
      //       });
      //     (err) => {
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'Erreur',
      //         detail: err.error,
      //       });
      //     };
      //   });
      // }
    }
  }

  public onClose (): void {
    this.ref.close();
  }

  onSelectPicture (event) {
    console.log('Selected picture', event);
  }

  // On picture Select
  onChange (event) {
    this.picture = event.files[ 0 ];
  }

  // OnClick of button Upload
  onUpload () {
    this.recipeService.uploadPicture(this.picture).subscribe((res) => {
      this.picture = res;
    });
  }

  onUploadPic (event) {
    for(let picture of event.files) {
      this.uploadedFiles.push(picture);
      console.log('picture : ', picture);
    }
  }

  // onBasicUpload (event) {
  //   const picture = event.files[ 0 ];
  //   this.form.patchValue({
  //     picture: picture,
  //   });
  //   this.form.get('picture').updateValueAndValidity();

  //   var formData: any = new FormData();
  //   formData.append('picture', this.form.get('picture').value);
  //   this.recipeService.uploadPicture(formData);

  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Success',
  //     detail: 'picture Uploaded with Basic Mode',
  //   });
  // }
  public checkError (controlName: string, errorName: string): boolean {
    return (
      this.form.controls[ controlName ].dirty &&
      this.form.controls[ controlName ].hasError(errorName)
    );
  }
}
