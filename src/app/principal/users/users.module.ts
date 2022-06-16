// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// PrimeNG
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
// Component
import { UsersComponent } from './users/users.component';
// Service
import { UsersService } from 'src/app/shared/services/users/users.service';

const routes: Routes = [{ path: '', component: UsersComponent }];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ButtonModule,
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
    //ContextMenuModule,
    //MultiSelectModule,
    //DropdownModule,
    //CalendarModule,
    //FileUploadModule,
    // RadioButtonModule,
  ],
  providers: [UsersService, MessageService, ConfirmationService],
})
export class UsersModule {}
