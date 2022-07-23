import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';
import { ComponentsModule } from './../components/components.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [DefaultComponent],
  exports: [DefaultComponent],
  imports: [CommonModule, RouterModule, ComponentsModule, ToastModule],
})
export class DefaultModule {
  // No code
}
