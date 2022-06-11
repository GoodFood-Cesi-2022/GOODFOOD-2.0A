import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { MessageModule } from 'primeng/message';
import { ComponentsModule } from 'src/app/layouts/components/components.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ApiTokenInterceptorService } from 'src/app/shared/interceptors/api-token-interceptor.service';
// import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [{ path: '', component: RecipesComponent }];

@NgModule({
  declarations: [RecipesComponent, RecipeDialogComponent],
  imports: [
    ButtonModule,
    CommonModule,
    ComponentsModule,
    ConfirmDialogModule,
    DataViewModule,
    DropdownModule,
    DynamicDialogModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RippleModule,
    RouterModule.forChild(routes),
    SelectButtonModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    PanelModule,
    ProgressSpinnerModule,
    DialogModule,
    CheckboxModule,
    CalendarModule,
  ],
  entryComponents: [RecipeDialogComponent],
  providers: [
    RecipeService,
    MessageModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
})
export class RecipeManagementModule {}
