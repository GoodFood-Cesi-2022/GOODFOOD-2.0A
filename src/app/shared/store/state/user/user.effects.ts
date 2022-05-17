import { AuthService } from './../../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loadUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loadUser),
        tap((action) =>
          localStorage.setItem(
            'userDetails',
            JSON.stringify(action.userDetails)
          )
        )
      ),
    { dispatch: false }
  );

  userLoaded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.userLoaded),
        tap((action) =>
          localStorage.setItem(
            'userDetails',
            JSON.stringify(action.userDetails)
          )
        )
      ),
    { dispatch: false }
  );

  // logOutAction$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(UserActions.logOutAction.logOutFlowInitiated.type),
  //       tap(() => this.authService.logOut())
  //     ),
  //   { dispatch: false }
  // );
}
