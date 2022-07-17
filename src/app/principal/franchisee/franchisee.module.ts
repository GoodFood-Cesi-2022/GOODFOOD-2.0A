// Angular
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';

import { FranchiseeComponent } from './franchisee/franchisee.component';
import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
import { ComponentsModule } from 'src/app/layouts/components/components.module';
import { ApiTokenInterceptorService } from 'src/app/shared/interceptors/api-token-interceptor.service';
import { FranchiseeDialogComponent } from './franchisee-dialog/franchisee-dialog.component';

const routes: Routes = [{ path: '', component: FranchiseeComponent }];

@NgModule({
  declarations: [FranchiseeComponent, FranchiseeDialogComponent],
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
    TabViewModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    KeyFilterModule,
  ],
  entryComponents: [FranchiseeDialogComponent],
  providers: [
    FranchiseeService,
    // MessageService,
    // ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
})
export class FranchiseeModule {}
