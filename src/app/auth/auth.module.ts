import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from "primeng/chips";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './login/login.component';
import { ResetpwComponent } from './resetpw/resetpw.component';

import { AuthService } from './common/services/auth.service';
import * as fromAuth from './common/store/auth.reducer';
import { AuthEffects } from './common/store/auth.effects';


@NgModule({
  declarations: [
    LoginComponent,
    ResetpwComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    ChipsModule,
    InputTextModule,
    RippleModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      { path: '', component: ResetpwComponent }]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
 export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
      ]
    }
  } 
}

// EffectsModule.forFeature([fromAuth.authFeatureKey, fromAuth.authReducer]),
//     StoreModule.forFeature(AuthEffects),