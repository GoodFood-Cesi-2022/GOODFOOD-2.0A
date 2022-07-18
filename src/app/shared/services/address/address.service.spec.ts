import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AddressService } from './address.service';
import { mockAddress } from '../../mock/address.mock';
import { environment } from 'src/environments/environment';
import { catchError, of, tap, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { mockUser1 } from '../../mock/users.mock';
import { _HttpRequest } from '../../constants/httpRequest.const';

fdescribe('AddressService', () => {
  let service: AddressService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddressService],
    });
    service = TestBed.inject(AddressService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  // localhost:8080/api/users/{user_id}/addresses
  describe('should call getAddresses()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(AddressService);
    });

    it('should return all addresses', (): void => {
      service.getAddresses(mockUser1).subscribe((data): void => {
        expect(data).toEqual([mockAddress]);
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}/addresses`
      );
      expect(req.request.method).toEqual(_HttpRequest.GET);

      expect(req.request.body).toEqual(null);

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: mockAddress,
      });
      req.event(expectedResponse);

      req.flush(mockAddress);
    });

    it('call API & should handle errors', (): void => {
      service
        .getAddresses(mockUser1)
        .pipe(
          catchError((error: Error) => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_value): void => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response): void => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users/${mockUser1.id}/addresses`
      );

      expect(req.request.method).toEqual(_HttpRequest.GET);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  // create
  describe('should call createAddress()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(AddressService);
    });

    it('should return new address', (): void => {
      service.createAddress(mockAddress).subscribe((data): void => {
        expect(data).toEqual(mockAddress);
      });

      // AddressService should have made one request to POST address from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/addresses`
      );
      expect(req.request.method).toEqual(_HttpRequest.POST);

      // Respond with the mock address
      req.flush(mockAddress);
    });

    it('call API & should handle errors', (): void => {
      service
        .createAddress(mockAddress)
        .pipe(
          catchError((error: Error) => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_value): void => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response): void => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/addresses`
      );

      expect(req.request.method).toEqual(_HttpRequest.POST);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  // update
  describe('should call updateAddress()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(AddressService);
    });

    it('should update address and return it', (): void => {
      service.updateAddress(mockAddress).subscribe({
        next: (data: string): void =>
          expect(data).withContext('should return address').toEqual(data),
        error: fail,
      });

      // AddressService should have made one request to POST address from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/addresses/${mockAddress.id}`
      );
      expect(req.request.method).toEqual(_HttpRequest.PUT);
      expect(req.request.body).toEqual(mockAddress);

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
      });
      req.event(expectedResponse);
    });

    it('call API & should handle errors', (): void => {
      service
        .updateAddress(mockAddress)
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
        `${environment.apiBaseUrl}/addresses/${mockAddress.id}`
      );

      expect(req.request.method).toEqual(_HttpRequest.PUT);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  // delete
  describe('should call deleteAddress()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(AddressService);
    });

    it('should delete address and return success message', (): void => {
      service.deleteAddress(mockAddress.id).subscribe({
        next: (data: string): void =>
          expect(data)
            .withContext('should return the success message')
            .toEqual(data),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/addresses/${mockAddress.id}`
      );
      expect(req.request.method).toEqual(_HttpRequest.DELETE);

      const expectedResponse = new HttpResponse({
        status: 204,
        statusText: 'No Content',
      });
      req.event(expectedResponse);
    });

    it('call API & should handle errors', (): void => {
      service
        .deleteAddress(mockAddress.id)
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
        `${environment.apiBaseUrl}/addresses/${mockAddress.id}`
      );

      expect(req.request.method).toEqual(_HttpRequest.DELETE);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });
});
