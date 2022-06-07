//  Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// PrimeNG
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
// Component
import { RecipeComponent } from './recipe/recipe.component';
// Service
import { RecipeService } from './recipe/recipe.service';

const routes: Routes = [{ path: '', component: RecipeComponent }];
@NgModule({
  declarations: [RecipeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ButtonModule,
    ConfirmDialogModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
    TooltipModule,
    ToolbarModule,
    PanelModule,
  ],
  providers: [RecipeService, MessageService, ConfirmationService],
})
export class RecipeModule {}
