import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports arra
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot(),
    LayoutsModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
