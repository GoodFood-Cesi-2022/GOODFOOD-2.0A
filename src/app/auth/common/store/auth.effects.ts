import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { concatMap, map } from "rxjs/operators";
import { AuthActions } from "src/app/shared/store/action-types";

import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthEffects {

    loadUser$ =
        createEffect(() => this.actions$.pipe(ofType(AuthActions.loadUser),
            concatMap(() => this.authService.getUser()),
            map((user) => AuthActions.userLoaded({ user }))
        ));
    
    constructor(private actions$: Actions, private authService: AuthService){}
}