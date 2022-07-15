import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHttpService {
  private errorHttpSubject = new BehaviorSubject<ErrorDataHttp>(undefined);
  errorHttp$: Observable<ErrorDataHttp> = this.errorHttpSubject.asObservable();

  constructor() {
    //NOSONAR
  }

  /**
   * Retrieve the error and the feature causing the error
   * @param httpErrorResponse serveur response
   * @param functionality function causing the problem
   */
  public newErrorHttp(
    httpErrorResponse: HttpErrorResponse,
    functionality: string
  ): void {
    const errorDataHttp: ErrorDataHttp = { httpErrorResponse, functionality };
    this.errorHttpSubject.next(errorDataHttp);
  }

  public closeErrorHttp(): void {
    this.errorHttpSubject.next(undefined);
  }
}

export interface ErrorDataHttp {
  httpErrorResponse: HttpErrorResponse;
  functionality: string;
}
