import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export const load = createAction('[Ingredient] Load Ingredient');

export const loaded = createAction(
  '[Load Ingredient Effect] Ingredient Loaded',
  props<{ ingredient: Ingredient[] }>()
);

export const update = createAction(
  '[Update Ingredient Effect] Update Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const updated = createAction(
  '[Effect Ingredient Loaded] Ingredient Updated',
  props<{ ingredient: Ingredient }>()
);
