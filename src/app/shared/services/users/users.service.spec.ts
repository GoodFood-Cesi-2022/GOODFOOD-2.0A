import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { catchError, Observable, of, tap } from 'rxjs';

import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { Message } from '../../constants/message.const';
import { mockUser1, mockUserArray, mockUserAuth1 } from '../../mock/users.mock';
import { _HttpRequest } from '../../constants/httpRequest.const';

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

  describe('get all users', (): void => {
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
      expect(req.request.method).toEqual(_HttpRequest.GET);

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

  describe('get one user', (): void => {
    beforeEach(() => {
      service = TestBed.inject(UsersService);
    });

    it('should return users (called once)', () => {
      service.getUser(mockUser1.id).subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return one users')
            .toEqual(mockUser1),
        error: fail,
      });

      // UsersService should have made one request to GET users from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}`
      );
      expect(req.request.method).toEqual(_HttpRequest.GET);

      // Respond with the mock users
      req.flush(mockUser1);
    });
  });

  describe('get user role', (): void => {
    beforeEach(() => {
      service = TestBed.inject(UsersService);
    });

    it('should return users (called once)', () => {
      service.getUserRole(mockUserAuth1.id).subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return one users')
            .toEqual(mockUserAuth1),
        error: fail,
      });

      // UsersService should have made one request to GET users from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}/roles`
      );
      expect(req.request.method).toEqual(_HttpRequest.GET);

      // Respond with the mock users
      req.flush(mockUserAuth1);
    });
  });

  // create

  describe('should call newUser()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(UsersService);
    });

    it('should return new user', (): void => {
      service.newUser(mockUser1).subscribe((data: User): void => {
        expect(data).toEqual(mockUser1);
      });

      // UsersService should have made one request to POST user from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users`
      );
      expect(req.request.method).toEqual(_HttpRequest.POST);

      // Respond with the mock user
      req.flush(mockUser1);
    });

    it('call API & should handle errors', (): void => {
      service
        .newUser(mockUser1)
        .pipe(
          catchError((error: Error): Observable<any> => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_value: string): void => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response: string): void => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users`
      );

      expect(req.request.method).toEqual(_HttpRequest.POST);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  // update
  describe('should call updateUser()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(UsersService);
    });

    it('should update user and return it', (): void => {
      service.updateUser(mockUser1).subscribe({
        next: (data: string): void =>
          expect(data)
            .withContext('should return the user')
            .toEqual(Message.UPDATE_SUCCESS),
        error: fail,
      });

      // UsersService should have made one request to POST user from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}`
      );
      expect(req.request.method).toEqual(_HttpRequest.PUT);
      expect(req.request.body).toEqual(mockUser1);

      req.flush({ message: Message.UPDATE_SUCCESS });
    });

    it('call API & should handle errors', (): void => {
      service
        .updateUser(mockUser1)
        .pipe(
          catchError((error: Error): Observable<any> => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_value: string): void => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response: string): void => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}`
      );

      expect(req.request.method).toEqual(_HttpRequest.PUT);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  // delete
  describe('should call deleteUser()', (): void => {
    beforeEach(() => {
      service = TestBed.inject(UsersService);
    });

    it('should delete user and return success message', (): void => {
      service.deleteUser(mockUser1.id).subscribe({
        next: (data: string): void =>
          expect(data)
            .withContext('should return the success message')
            .toEqual(Message.DELETE),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}`
      );
      expect(req.request.method).toEqual(_HttpRequest.DELETE);

      req.flush({ message: Message.DELETE });
    });

    it('call API & should handle errors', (): void => {
      service
        .deleteUser(mockUser1.id)
        .pipe(
          catchError((error: Error): Observable<any> => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_value: any): void => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response: any): void => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}`
      );

      expect(req.request.method).toEqual(_HttpRequest.DELETE);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });
});
