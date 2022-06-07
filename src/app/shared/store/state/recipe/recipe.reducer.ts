import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.model';
import * as RecipeActions from './recipe.actions';

export const recipeFeatureKey = 'recipe';

export interface RecipeState {
  recipe?: Recipe;
}

export const initialState: RecipeState = {
  recipe: undefined,
};

export const userReducer = createReducer(
  initialState,
  on(RecipeActions.recipeLoaded, (state, action) => {
    return {
      // ...state,
      recipe: action.recipe,
    };
  })
  // ,
  // on(RecipeActions.updateUser, (state, action) => {
  //   return {
  //     userDetails: action.userDetails,
  //   };
  // })
);
