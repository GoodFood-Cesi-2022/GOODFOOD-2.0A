import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './recipe.reducer';

export const selectRecipeState = createFeatureSelector<RecipeState>('recipe');

/**
 * Calling this method by recipeComponent
 */
export const selectRecipe = createSelector(
  selectRecipeState,
  (rec) => rec.recipe
);
