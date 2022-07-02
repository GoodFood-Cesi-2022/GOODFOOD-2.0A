import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { concatMap, map } from 'rxjs';
import { RecipeActions } from 'src/app/shared/store/state/recipe/index';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) {}

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.loadRecipe),
      concatMap(() => this.recipeService.getRecipes()),
      map((recipe) => RecipeActions.recipeLoaded({ recipe }))
    )
  );

  // updateRecipe$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RecipeActions.updateRecipe),
  //     concatMap((action) => this.recipeService.updateRecipe(action.recipe)),
  //     map((recipe) => RecipeActions.recipeUpdated({ recipe }))
  //   )
  // );
}
