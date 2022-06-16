import { EndPoints } from '../../../../shared/constants/constants';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Recipe, RecipeType } from 'src/app/shared/models/recipe.model';
import { User } from 'src/app/shared/models/user.model';
import { Ingredient, IngreType } from 'src/app/shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss'],
})
export class RecipeDialogComponent implements OnInit {
  mode: 'UPDATE' | 'CREATE';
  Textbutton = 'Modifier' || 'Créer';
  form: FormGroup;
  //------------------------------- Recipe Type : dropdown (1)
  recipesType: Recipe[] = [];
  recipe: Recipe;
  //------------------------------- Ingredients details : drop down (2)
  ingredients: Ingredient[] = [];
  ingredientsDetails: Ingredient;
  //------------------------------- Ingredients types : drop down (3)
  // ingredientsType: Types[];
  recipeType: RecipeType;
  //------------------------------- User & User id
  user: User[] = [];
  idUser: number;
  submitted: boolean;
  idRecipe: number;
  star: boolean;
  // ---------------------- Upload image
  uploadedFiles: any[] = [];
  //-------------------------------
  isDisabledControlForm = false;
  //item: string;
  //items: SelectItem[];
  //first = 0;

  // view: CalendarView = CalendarView.Month;

  // viewDate: Date = new Date();

  // events: CalendarEvent[] = [];
  idIng: number;
  locale = 'fr';
  public calendar_fr: any;
  public calendar: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private messageService: MessageService,
    private recipeService: RecipeService
  ) {
    this.user = config.data.user;
    this.recipe = config.data.recipe;
    this.ingredients = config.data.ingredients;
    this.mode = config.data.mode;

    // this.user.forEach((user) => {
    //   user.firstname + '' + user.lastname;
    // });

    if (this.mode === 'UPDATE') {
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

  ngOnInit(): void {
    this.calendar_fr = {
      closeText: 'Fermer',
      prevText: 'Précédent',
      nextText: 'Suivant',
      currentText: "Aujourd'hui",
      monthNames: [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
      ],
      monthNamesShort: [
        'janv.',
        'févr.',
        'mars',
        'avr.',
        'mai',
        'juin',
        'juil.',
        'août',
        'sept.',
        'oct.',
        'nov.',
        'déc.',
      ],
      dayNames: [
        'dimanche',
        'lundi',
        'mardi',
        'mercredi',
        'jeudi',
        'vendredi',
        'samedi',
      ],
      dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      weekHeader: 'Sem.',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '',
    };

    /* retrieve recipe types */
    this.recipeService.getRecipesType().subscribe((res) => {
      this.recipesType = res;
    });
    /* retrieve ingredients data */
    this.recipeService.getIngredients().subscribe((res) => {
      this.ingredients = res;
      //   this.ingredients.forEach((e) => { e.id; });
      //   console.log('----------> component > ingredient : ', res,);
      // });
      /* retrieve ingredients types */
      // this.recipeService.getIngredientsTypes().subscribe((res) => {
      //   this.ingredientsType = res;
      //   console.log('^^^^^^^^^^^^^ component > type ingredients : ', res);
    });

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      recipeType: new FormControl(),
      price: ['', [Validators.required]],
      ingredientsDetails: new FormControl(),
      description: [''],
      star: false,
      availableDate: ['', [Validators.required]],
    });
    //if (this.mode === 'CREATE') {
    // this.formAddIngredientsDetailsValidators();
    // this.formAddIngredientsTypeValidators();
    // this.changeStatusIngredientsDetails('CREATE');
    // this.changeStatusingredientsType('CREATE');
    // } else {
    // console.log('En attend de la partie update une recette.');
    // }
  }

  onClickStar(event: any): void {
    this.star = event.checked;
    this.recipe.star = event.checked;
    if (event.checked) {
      this.star = true;
      this.form.get('star').setValue(true);
    } else {
      this.form.get('star').setValue(false);
    }
  }

  // private formAddRecipesTypeValidators(): void {
  //   this.form.get('recipeType').clearValidators();
  //   this.form.get('recipeType').updateValueAndValidity();
  // }
  // private formAddIngredientsDetailsValidators(): void {
  //   this.form.get('ingredientsDetails').clearValidators();
  //   this.form.get('ingredientsDetails').updateValueAndValidity();
  // }
  // private formAddIngredientsTypeValidators(): void {
  //   this.form.get('types').clearValidators();
  //   this.form.get('types').updateValueAndValidity();
  // }

  // private changeStatusRecipesType(mode: string): void {
  //   if (mode === 'CREATE') {
  //     this.form.controls['recipeType'].enable();
  //   } else {
  //     this.form.controls['recipeType'].disable();
  //   }
  // }
  // private changeStatusIngredientsDetails(mode: string): void {
  //   if (mode === 'CREATE') {
  //     this.form.controls['ingredientsDetails'].enable();
  //   } else {
  //     this.form.controls['ingredientsDetails'].disable();
  //   }
  // }
  // private changeStatusingredientsType(mode: string): void {
  //   if (mode === 'CREATE') {
  //     this.form.controls['types'].enable();
  //   } else {
  //     this.form.controls['types'].disable();
  //   }
  // }

  private makeRecipe(): void {
    //if (this.mode === 'CREATE') {
    this.recipe.name = this.form.value.title;
    this.recipe.recipe_type = this.form.controls['recipeType'].value.code;
    this.recipe.base_price = this.form.value.base_price;

    //this.recipe.ingredients = this.form.controls['ingredientsDetails'].value;

    // let idIngre: number[] = [];
    // var ingredients = this.form.controls['ingredientsDetails'].value;
    // ingredients.forEach((e) => {
    //   idIngre.push(e.id);
    //   console.log('idIngre ---> ', idIngre);
    // });
    this.recipe.ingredients = this.form.controls['ingredientsDetails'].value;

    this.recipe.star = this.form.value.star;
    this.recipe.available_at = this.form.value.availableDate;
    this.recipe.description = this.form.value.description;

    console.log('make new recipe : ', this.recipe);
    // var ingredients = this.form.controls['ingredientsDetails'].value;
    // for (let obj of ingredients) {
    //   for (let key in obj) {
    //     if (key == 'id') {
    //       console.log('key:', key, 'value:', obj[key]);
    //     }
    //   }
    // }

    // this.form.controls['ingredientsDetails'].value.forEach((e) => {
    //   this.recipe.ingredients.push(e);
    //   console.log('xxxxxxxxx : ', e);
    // });
    //this.idIng  = this.form.controls['ingredientsDetails'].value.id;

    // this.form['ingredientsDetails'].value.forEach((e) => {
    //   this.recipe.ingredients.forEach((e) => e.id);
    //   console.log('idIng ===> ', e);
    // });
  }

  onSubmit(): void {
    console.log('on submit recipe');
    //if (this.form.valid) {
    this.makeRecipe();
    //if (this.mode === 'CREATE') {

    this.recipeService
      .createRecipe(this.recipe)
      .pipe()
      .subscribe((res) => this.ref.close(res));
    //}
    //}
  }

  public onClose(): void {
    this.ref.close();
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
  onBasicUpload(event) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }
  // public checkError(controlName: string, errorName: string): boolean {
  //   return (
  //     this.form.controls[controlName].dirty &&
  //     this.form.controls[controlName].hasError(errorName)
  //   );
  // }
}
