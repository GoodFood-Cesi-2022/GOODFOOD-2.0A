import { TestBed } from '@angular/core/testing';

import { IsUnauthenticatedGuard } from './is-unauthenticated.guard';

describe('IsUnauthenticatedGuard', () => {
  let guard: IsUnauthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsUnauthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
