import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { IsUnauthenticatedGuard } from './is-unauthenticated.guard';

fdescribe('IsUnauthenticatedGuard', () => {
  let guard: IsUnauthenticatedGuard;
  let store: MockStore;
  let httpTestingController: HttpTestingController;
  const initialState = { loggedIn: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [IsUnauthenticatedGuard, provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(IsUnauthenticatedGuard);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
    expect(guard).toBeTruthy();
  });
});
