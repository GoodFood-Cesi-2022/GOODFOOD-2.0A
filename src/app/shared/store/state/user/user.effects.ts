import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/user/auth/auth.service';
import {
  selectUserDetails,
  UserActions,
} from 'src/app/shared/store/state/user/index';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store.reducer';
import { UserService } from 'src/app/shared/services/user/user/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    //private userService: UserService,
    private profileService: ProfileService
  ) {
    // this.store
    //   .pipe(
    //     select(selectUserDetails),
    //     filter((user) => user != null)
    //   )
    //   .subscribe(
    //     (user) => {
    //       this.userID = user.id || 1;
    //     },
    //     (error) => console.log('UserEffects > error: ', error)
    //   );
  }
  // userID: number = null;

  // loadUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.loadUser),
  //     concatMap(() => this.userService.getNewUser()),
  //     map((userDetails) => UserActions.userLoaded({ userDetails }))
  //   )
  // );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      //concatMap(() => this.authService.getAppUser()),
      concatMap(() => this.authService.getCurrentUserRemote()),
      //concatMap(() => this.authService.getUser()),
      map((userDetails) => UserActions.userLoaded({ userDetails }))
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap((action) => this.profileService.updateUser(action.userDetails)),
      map((userDetails) => UserActions.userUpdated({ userDetails }))
    )
  );

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
