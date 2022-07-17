import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { HttpErrorInterceptor } from './http-error.interceptor';

fdescribe('ApiTokenInterceptorService', () => {
  let service: HttpErrorInterceptor;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpErrorInterceptor, MessageService],
    });
    service = TestBed.inject(HttpErrorInterceptor);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
