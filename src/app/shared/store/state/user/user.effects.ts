import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth/auth/auth.service";
import { UserActions } from "src/app/shared/store/state/user/index";
import { ProfileService } from "src/app/shared/services/profile/profile.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService, private profileService: ProfileService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      concatMap(() => this.authService.getUser()),
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
}
