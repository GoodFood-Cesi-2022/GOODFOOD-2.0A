import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {
    //NOSONAR
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((err) => this.handleError(err)));
  }
  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 400:
        this.messageService.add({
          life: 5000,
          severity: 'warn',
          summary: 'Service Message',
          detail: error?.error?.message,
        });
        console.log(
          "Désolé, vous n'etes pas autorise a acceder a ce page.",
          error?.error?.message
        );
        break;
      case 401:
        this.messageService.add({
          life: 5000,
          severity: 'warn',
          summary: 'Service Message',
          detail: error?.error?.message,
        });
        console.log("Désolé, vous n'etes pas autorise a acceder a ce page.");
        break;
      case 404:
        this.messageService.add({
          life: 5000,
          severity: 'warn',
          summary: 'Service Message',
          detail: error?.error?.message,
        });
        console.log('Désolé, page introuvable.');
        break;
      case 500:
        this.messageService.add({
          life: 5000,
          severity: 'error',
          summary: 'Service Message',
          detail: error?.error?.message,
        });
        console.log('Désolé, une erreur est survenue au niveau serveur.');
        break;
      default:
        this.messageService.add({
          life: 5000,
          severity: 'error',
          summary: 'Service Message',
          detail: error?.error?.message,
        });
        console.log('Désolé une erreur est survenue: ', error?.error?.message);
    }
    return throwError(() => new Error(error.message));
  }
}
