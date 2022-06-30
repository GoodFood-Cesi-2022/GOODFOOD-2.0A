import { Injectable } from '@angular/core';
import { concatMap, map } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { IngredientService } from 'src/app/shared/services/ingredient/ingredient.service';
import { IngredientActions } from '.';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private ingredientService: IngredientService
  ) {}

  loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientActions.load),
      concatMap(() => this.ingredientService.getIngredients()),
      map((ingredient) => IngredientActions.loaded({ ingredient }))
    )
  );

  updateIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientActions.update),
      concatMap((action) =>
        this.ingredientService.updateIngredient(action.ingredient)
      ),
      map((ingredient) => IngredientActions.updated({ ingredient }))
    )
  );
}
