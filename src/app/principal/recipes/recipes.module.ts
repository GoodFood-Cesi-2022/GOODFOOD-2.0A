import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { RecipesComponent } from './recipes.component';

const routes: Routes = [{ path: '', component: RecipesComponent }];

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ProgressSpinnerModule,
    FormsModule,
  ],
})
export class RecipesModule {}
