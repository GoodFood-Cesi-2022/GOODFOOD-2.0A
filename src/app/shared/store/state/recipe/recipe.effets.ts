import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { concatMap, map } from 'rxjs';
import { loadRecipe, recipeLoaded } from './recipe.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService
  ) {}

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipe),
      concatMap(() => this.recipeService.getRecipes()),
      map((recipe) => recipeLoaded({ recipe }))
    )
  );
}
