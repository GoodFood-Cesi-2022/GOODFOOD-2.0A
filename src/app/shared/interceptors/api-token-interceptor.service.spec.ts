import { TestBed } from '@angular/core/testing';

import { ApiTokenInterceptorService } from './api-token-interceptor.service';

describe('ApiTokenInterceptorService', () => {
  let service: ApiTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
