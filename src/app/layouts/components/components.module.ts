import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';

import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [MenuComponent, SidebarComponent, FooterComponent],
  exports: [MenuComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CheckboxModule,
    ButtonModule,
    TooltipModule,
    SidebarModule,
    DropdownModule,
    RippleModule,
  ],
})
export class ComponentsModule {}
