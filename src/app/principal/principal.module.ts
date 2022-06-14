import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { routing } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [PrincipalComponent],
  imports: [CommonModule, FormsModule, routing, LayoutsModule],
  providers: [MessageService],
})
export class PrincipalModule {}
