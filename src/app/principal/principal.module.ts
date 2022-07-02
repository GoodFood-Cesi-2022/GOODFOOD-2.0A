import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from '../shared/store/state/user/user.reducer';
import { UserEffects } from '../shared/store/state/user';

import { routing } from './principal-routing.module';
import { LayoutsModule } from '../layouts/layouts.module';

import { PrincipalComponent } from './principal.component';
import { PageNotFoundComponent } from '../layouts/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [PrincipalComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    routing,
    LayoutsModule,
    StoreModule.forFeature(fromAuth.userFeatureKey, fromAuth.userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [MessageService],
})
export class PrincipalModule {
  // No code
}
