import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminGuard } from './admin.guard';

fdescribe('AdminGuard', () => {
  let guard: AdminGuard;
  let store: MockStore;
  const initialState = { loggedIn: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AdminGuard, provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
    expect(guard).toBeTruthy();
  });
});
