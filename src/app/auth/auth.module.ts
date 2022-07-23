import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "./auth/auth.component";
import { UserEffects } from "../shared/store/state/user";
import * as fromAuth from "../shared/store/state/user/user.reducer";
import { AuthService } from "../shared/services/user/auth/auth.service";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "redirect", component: AuthComponent },
];

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromAuth.userFeatureKey, fromAuth.userReducer),
    //StoreModule.forFeature('user', fromAuth.userReducer),
    ProgressSpinnerModule,
    EffectsModule.forFeature([UserEffects]),
    FormsModule,
    ButtonModule,
    RippleModule,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
