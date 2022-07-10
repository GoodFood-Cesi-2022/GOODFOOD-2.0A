import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RecipeDialogComponent } from './recipe/recipe-dialog/recipe-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipesComponent } from './recipe/recipes/recipes.component';
import { RecipeService } from 'src/app/shared/services/recipe/recipe.service';
import { ComponentsModule } from 'src/app/layouts/components/components.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ApiTokenInterceptorService } from 'src/app/shared/interceptors/api-token-interceptor.service';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { IngredientComponent } from './ingredient/ingredient.component';
import { TabsComponent } from './tabs/tabs.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DividerModule } from 'primeng/divider';
import { IngredientTypeComponent } from './ingredient-type/ingredient-type.component';

const routes: Routes = [{ path: '', component: TabsComponent }];

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDialogComponent,
    IngredientComponent,
    TabsComponent,
    IngredientTypeComponent,
  ],
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
    TableModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    PanelModule,
    ProgressSpinnerModule,
    DialogModule,
    CheckboxModule,
    CalendarModule,
    TabViewModule,
    MultiSelectModule,
    KeyFilterModule,
    DividerModule,
  ],
  entryComponents: [RecipeDialogComponent],
  providers: [
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
})
export class RecipeManagementModule {}
