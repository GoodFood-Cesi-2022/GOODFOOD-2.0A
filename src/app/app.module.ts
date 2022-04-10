import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  ErrorHandler,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { GlobalHttpInterceptorService } from './app.interceptor';
import { routing } from './app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { WithCredentialsHttpInterceptor } from '../../services/WithCredentielsHttpIntercepter';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    routing,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsHttpInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    DialogService,
    ConfirmationService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
