import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';

import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
import { ComponentsModule } from 'src/app/layouts/components/components.module';
import { ApiTokenInterceptorService } from 'src/app/shared/interceptors/api-token-interceptor.service';
import { FranchiseeComponent } from './franchisee/franchisee.component';
import { FranchiseeDialogComponent } from './franchisee-dialog/franchisee-dialog.component';
import { FranchiseeDetailComponent } from './franchisee-detail/franchisee-detail.component';

const routes: Routes = [
  { path: '', component: FranchiseeComponent },
  { path: ':id', component: FranchiseeDetailComponent },
];

@NgModule({
  declarations: [
    FranchiseeComponent,
    FranchiseeDialogComponent,
    FranchiseeDetailComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    ComponentsModule,
    ConfirmDialogModule,
    DialogModule,
    DynamicDialogModule,
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    RippleModule,
    RouterModule.forChild(routes),
    SelectButtonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    PanelModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    KeyFilterModule,
  ],
  entryComponents: [FranchiseeDialogComponent],
  providers: [
    FranchiseeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
})
export class FranchiseeModule {}
