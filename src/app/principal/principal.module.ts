import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [PrincipalComponent],
  imports: [CommonModule, FormsModule, routing, LayoutsModule, AuthModule],
})
export class PrincipalModule {}
