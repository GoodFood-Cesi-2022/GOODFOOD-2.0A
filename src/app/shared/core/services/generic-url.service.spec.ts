import { TestBed } from '@angular/core/testing';

import { GenericUrlService } from './generic-url.service';

describe('GenericUrlService', () => {
  let service: GenericUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
