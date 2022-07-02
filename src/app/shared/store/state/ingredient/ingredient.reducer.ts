import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import * as IngredientActions from './ingredient.actions';

export const ingredientFeatureKey = 'ingredient';

export interface IngredientState {
  ingredient?: Ingredient;
}

export const initialState: IngredientState = {
  ingredient: undefined,
};

export const ingredientReducer = createReducer(
  initialState,
  on(IngredientActions.loaded, (state, action) => {
    return {
      ...state,
      ingredient: action.ingredient,
    };
  }),
  on(IngredientActions.update, (state, action) => {
    return {
      ...state,
      ingredient: action.ingredient,
    };
  })
);
