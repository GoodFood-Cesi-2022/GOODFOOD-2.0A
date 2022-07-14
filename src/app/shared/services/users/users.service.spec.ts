import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

describe('UsersService', () => {
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
    let getAll: User[];

    beforeEach(() => {
      service = TestBed.inject(UsersService);
      getAll = [
        {
          id: 1,
          firstname: 'Zahra',
          lastname: 'Dubeau',
          phone: '1212121212',
          email: 'user@vol.fr',
        },
        {
          id: 2,
          firstname: 'Sarah',
          lastname: 'Dubois',
          phone: '1122334455',
          email: 'sara@gmail.fr',
        },
      ] as User[];
    });

    it('should return users (called once)', () => {
      service.getUsers().subscribe({
        next: (values) =>
          expect(values).withContext('should return all users').toEqual(getAll),
        error: fail,
      });

      // UsersService should have made one request to GET users from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock users
      req.flush(getAll);
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
      req.flush([]); // Respond with no users
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
          expect(values).withContext('should return users').toEqual(getAll),
        error: fail,
      });

      const requests = httpTestingController.match(
        `${environment.apiBaseUrl}/users`
      );
      expect(requests.length).withContext('calls to getUsers()').toEqual(3);

      // Respond to each request with different mock users results
      requests[0].flush([]);
      requests[1].flush([
        {
          id: 3,
          firstname: 'Thomas',
          lastname: 'Dubois',
          phone: '0476112233',
          email: 'thomas@gmail.fr',
        },
      ]);
      requests[2].flush(getAll);
    });
  });
});
