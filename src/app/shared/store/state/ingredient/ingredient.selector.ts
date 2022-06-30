import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientState } from './ingredient.reducer';

export const selectIngredientState =
  createFeatureSelector<IngredientState>('ingredient');

/**
 * Calling this method by ingredientComponent
 */
export const selectIngredient = createSelector(
  selectIngredientState,
  (rec) => rec.ingredient
);
