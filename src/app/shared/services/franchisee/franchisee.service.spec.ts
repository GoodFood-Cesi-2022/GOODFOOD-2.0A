import { TestBed } from '@angular/core/testing';

import { FranchiseeService } from './franchisee.service';

describe('FranchiseeService', () => {
  let service: FranchiseeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranchiseeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
