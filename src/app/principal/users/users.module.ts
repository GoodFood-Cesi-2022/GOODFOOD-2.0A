// Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// PrimeNG
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { InputTextareaModule } from 'primeng/inputtextarea';
// Component
import { UsersComponent } from './users/users.component';
// Service
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ComponentsModule } from 'src/app/layouts/components/components.module';
import { ApiTokenInterceptorService } from 'src/app/shared/interceptors/api-token-interceptor.service';

const routes: Routes = [{ path: '', component: UsersComponent }];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ButtonModule,
    ComponentsModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    SliderModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ProgressBarModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsersService,
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
})
export class UsersModule {}
