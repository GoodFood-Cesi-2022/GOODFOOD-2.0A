import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FranchiseeComponent } from './franchisee/franchisee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ComponentsModule } from 'src/app/layouts/components/components.module';

const routes: Routes = [{ path: '', component: FranchiseeComponent }];

@NgModule({
  declarations: [FranchiseeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    DividerModule,
    ToastModule,
    InputTextModule,
    HttpClientModule,
    ToolbarModule,
    DropdownModule,
    CardModule,
    CalendarModule,
    ComponentsModule,
  ],
})
export class FranchiseeModule {}
