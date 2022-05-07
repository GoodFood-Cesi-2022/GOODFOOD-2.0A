import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { LoginComponent } from './login.component';
import { LoginRouter } from './login-routing.module';
import { CallbackComponent } from './callback/callback.component';


@NgModule({
  declarations: [LoginComponent, CallbackComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRouter,
    FormsModule,
    ButtonModule,
    RippleModule,
  ],
})
export class LoginModule {}