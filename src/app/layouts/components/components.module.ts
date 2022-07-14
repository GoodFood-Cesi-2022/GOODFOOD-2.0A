import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TitleComponent } from './title/title.component';
import { LoadingComponent } from './loading/loading.component';
import { ServerErrorComponent } from './server-error/server-error.component';

@NgModule({
  declarations: [
    TopbarComponent,
    SidebarComponent,
    TitleComponent,
    LoadingComponent,
    FooterComponent,
    ServerErrorComponent,
  ],
  exports: [
    TopbarComponent,
    SidebarComponent,
    TitleComponent,
    LoadingComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CheckboxModule,
    BadgeModule,
    ButtonModule,
    TooltipModule,
    SidebarModule,
    DropdownModule,
    RippleModule,
  ],
})
export class ComponentsModule {
  // No code
}
