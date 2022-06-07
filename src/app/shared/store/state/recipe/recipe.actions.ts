import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.model';

export const loadRecipe = createAction('[Recipe] Load ???');

export const recipeLoaded = createAction(
  '[Load Recipe Effet] recipe loaded',
  props<{ recipe: Recipe }>()
);
