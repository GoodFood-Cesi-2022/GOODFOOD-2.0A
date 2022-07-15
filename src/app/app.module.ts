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
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { ApiTokenInterceptorService } from './shared/interceptors/api-token-interceptor.service';
import { LoadingService } from './shared/services/loading/loading.service';
import { AuthModule } from './auth/auth.module';
import { routing } from './app-routing.module';
import { metaReducers, reducers } from './shared/store/store.reducer';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './shared/interceptors/http-error/http-error.interceptor';
import { ErrorHttpService } from './shared/services/error-http/error-http.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    AuthModule.forRoot(),
    routing,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictStateSerializability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
      },
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [
    {
      provide: ErrorHandler,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    DialogService,
    ConfirmationService,
    ErrorHttpService,
    MessageService,
    LoadingService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: GlobalHttpInterceptorService,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
