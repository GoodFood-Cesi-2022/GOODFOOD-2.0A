import { TestBed } from '@angular/core/testing';

import { ErrorHttpService } from './error-http.service';

describe('ErrorHttpService', () => {
  let service: ErrorHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
