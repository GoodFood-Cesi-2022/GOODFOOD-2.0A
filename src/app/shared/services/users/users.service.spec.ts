import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { mockUserArray } from '../../mock/users.mock';

fdescribe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get all users', () => {
    beforeEach(() => {
      service = TestBed.inject(UsersService);
    });

    it('should return users (called once)', () => {
      service.getUsers().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return all users')
            .toEqual(mockUserArray),
        error: fail,
      });

      // UsersService should have made one request to GET users from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock users
      req.flush({ data: mockUserArray });
    });

    it('should be OK returning no users', () => {
      service.getUsers().subscribe({
        next: (values) =>
          expect(values.length)
            .withContext('should have empty users array')
            .toEqual(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users`
      );
      req.flush({ data: [] }); // Respond with no users
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = '404 Not Found';
      service.getUsers().subscribe({
        next: (_values) => fail('expected to fail'),
        error: (error) => expect(error.message).toContain(msg),
      });
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users`
      );

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return users (called multiple times)', () => {
      service.getUsers().subscribe();
      service.getUsers().subscribe();
      service.getUsers().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return users')
            .toEqual(mockUserArray),
        error: fail,
      });

      const requests = httpTestingController.match(
        `${environment.apiBaseUrl}/users`
      );
      expect(requests.length).withContext('calls to getUsers()').toEqual(3);

      // Respond to each request with different mock users results
      requests[0].flush({ data: [] });
      requests[1].flush({
        data: [
          {
            id: 3,
            firstname: 'Thomas',
            lastname: 'Dubois',
            phone: '0476112233',
            email: 'thomas@gmail.fr',
          },
        ],
      });
      requests[2].flush({ data: mockUserArray });
    });
  });
});
