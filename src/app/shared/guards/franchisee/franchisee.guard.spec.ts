import { TestBed } from '@angular/core/testing';

import { FranchiseeGuard } from './franchisee.guard';

describe('FranchiseeGuard', () => {
  let guard: FranchiseeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FranchiseeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
