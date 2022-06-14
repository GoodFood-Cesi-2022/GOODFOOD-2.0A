import { StoreModule } from '@ngrx/store';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { UserEffects } from '../shared/store/state/user';
import * as fromAuth from '../shared/store/state/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from '../shared/services/user/auth/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'redirect', component: CallbackComponent },
];

@NgModule({
  declarations: [LoginComponent, CallbackComponent],
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
