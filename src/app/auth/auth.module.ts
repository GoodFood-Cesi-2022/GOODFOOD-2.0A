import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RememberComponent } from './remember/remember.component';
import { PasswordComponent } from './password/password.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from "primeng/chips";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
 
@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RememberComponent,
    PasswordComponent
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
    FormsModule
  ],
  bootstrap: [LoginComponent]
})
export class AuthModule {}
