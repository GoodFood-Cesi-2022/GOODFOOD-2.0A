import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.model';

export const loadRecipe = createAction('[Recipe] Load Recipe');

export const recipeLoaded = createAction(
  '[Load Recipe Effect] Recipe Loaded',
  props<{ recipe: Recipe[] }>()
);

export const updateRecipe = createAction(
  '[Update Recipe Effect] Update Recipe',
  props<{ recipe: Recipe }>()
);

export const recipeUpdated = createAction(
  '[Effect Recipe Loaded] Recipe Updated',
  props<{ recipe: Recipe }>()
);
