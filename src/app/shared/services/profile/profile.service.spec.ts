import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import {
  mockUserWithAuth,
  mockUserAuth,
  mockUserAuth1,
  mockUserAuth2,
  mockUser1,
} from '../../mock/users.mock';

import { ProfileService } from './profile.service';

fdescribe('ProfileService', () => {
  let service: ProfileService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ProfileService],
    });

    service = TestBed.inject(ProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get the user', (): void => {
    beforeEach(() => {
      service = TestBed.inject(ProfileService);
    });

    it('should return the User (called once)', () => {
      service.getUser().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return the current User')
            .toEqual(mockUserWithAuth),
        error: fail,
      });

      // IngredientService should have made one request to GET ingredient from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/current?includes[]=roles`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock ingredients
      req.flush(mockUserAuth);
    });

    it('should return current user (called multiple times)', () => {
      service.getUser().subscribe();
      service.getUser().subscribe();
      service.getUser().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return the User')
            .toEqual(mockUserWithAuth),
        error: fail,
      });

      const requests = httpTestingController.match(
        `${environment.apiBaseUrl}/users/current?includes[]=roles`
      );
      expect(requests.length).withContext('calls to getUser()').toEqual(3);

      // Respond to each request with different mock ingredient results
      requests[0].flush(mockUserAuth1);
      requests[1].flush(mockUserAuth2);
      requests[2].flush(mockUserAuth);
    });
  });

  describe('update the current user', (): void => {
    beforeEach(() => {
      service = TestBed.inject(ProfileService);
    });

    it('should return the User (called once)', () => {
      service.updateUser(mockUser1).subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return the updated User')
            .toEqual(mockUser1),
        error: fail,
      });

      // IngredientService should have made one request to GET ingredient from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}`
      );
      expect(req.request.method).toEqual('PUT');

      // Respond with the mock ingredients
      req.flush(mockUser1);
    });
  });
});
