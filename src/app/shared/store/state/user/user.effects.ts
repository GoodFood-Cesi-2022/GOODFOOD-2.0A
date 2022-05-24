import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/user/auth/auth.service';
import { UserActions } from 'src/app/shared/store/state/user/index';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      concatMap(() => this.authService.getCurrentUser()),
      map((userDetails) => UserActions.userLoaded({ userDetails }))
    )
  );

  updateFirstname$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      concatMap(() => this.authService.getCurrentUser()),
      map((userDetails) => UserActions.userLoaded({ userDetails }))
    )
  );

  updateLastnname$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      concatMap(() => this.authService.getCurrentUser()),
      map((userDetails) => UserActions.userLoaded({ userDetails }))
    )
  );

  updatePhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      concatMap(() => this.authService.getCurrentUser()),
      map((userDetails) => UserActions.userLoaded({ userDetails }))
    )
  );

  updateEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      concatMap(() => this.authService.getCurrentUser()),
      map((userDetails) => UserActions.userLoaded({ userDetails }))
    )
  );

  // loadUser$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(UserActions.loadUser),
  //       tap((action) =>
  //         localStorage.setItem(
  //           'userDetails',
  //           JSON.stringify(action.userDetails)
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // userLoaded$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(UserActions.userLoaded),
  //       tap((action) =>
  //         localStorage.setItem(
  //           'userDetails',
  //           JSON.stringify(action.userDetails)
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // logOutAction$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(UserActions.logOutAction.logOutFlowInitiated.type),
  //       tap(() => this.authService.logOut())
  //     ),
  //   { dispatch: false }
  // );
}
