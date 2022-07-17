import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FranchiseeGuard } from './franchisee.guard';

fdescribe('FranchiseeGuard', () => {
  let guard: FranchiseeGuard;
  let store: MockStore;
  const initialState = { loggedIn: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [FranchiseeGuard, provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(FranchiseeGuard);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
    expect(guard).toBeTruthy();
  });
});
