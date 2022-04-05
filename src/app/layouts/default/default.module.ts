import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';
import { ComponentsModule } from './../components/components.module';

@NgModule({
  declarations: [ DefaultComponent ],
  exports: [ DefaultComponent ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ]
})
export class DefaultModule { }
