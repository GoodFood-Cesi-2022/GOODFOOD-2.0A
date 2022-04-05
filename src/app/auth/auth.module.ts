import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from "primeng/ripple";
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }]),
  ]
})
 export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
      ]
    }
  }
}
