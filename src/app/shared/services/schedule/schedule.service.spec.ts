import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

import { ScheduleService } from './schedule.service';
import { environment } from 'src/environments/environment';
import { mockSchedule } from '../../mock/schedule.mock';
import { mockFranchisee } from '../../mock/franchisee.mock';

fdescribe('ScheduleService', () => {
  let service: ScheduleService;
  let httpTestingController: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScheduleService],
    });
    service = TestBed.inject(ScheduleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach((): void => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get schedule', () => {
    beforeEach(() => {
      service = TestBed.inject(ScheduleService);
    });

    it('should return schedule', () => {
      service.getSchedule(mockFranchisee).subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return schedule')
            .toEqual(mockSchedule),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/times`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock schedule
      req.flush(mockSchedule);
    });
  });

  // create
  describe('should call createSchedule()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(ScheduleService);
    });

    it('should return new schedule', (): void => {
      service
        .createSchedule(mockFranchisee, mockSchedule)
        .subscribe((data): void => {
          expect(data).toEqual(data);
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/times`
      );
      expect(req.request.method).toEqual('POST');

      // Respond with the mock schedule
      req.flush(mockSchedule);
    });

    it('call API & should handle errors', (): void => {
      service
        .createSchedule(mockFranchisee, mockSchedule)
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
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/times`
      );

      expect(req.request.method).toEqual('POST');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  // update
  describe('should call updateSchedule()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(ScheduleService);
    });

    it('should update schedule and return success message', (): void => {
      service.updateSchedule(mockFranchisee, mockSchedule).subscribe({
        next: (data): void =>
          expect(data).withContext('should return the message').toEqual(data),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/times`
      );
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(mockSchedule);

      const expectedResponse = new HttpResponse({
        status: 204,
        statusText: 'No Content',
      });
      req.event(expectedResponse);
    });

    it('call API & should handle errors', (): void => {
      service
        .updateSchedule(mockFranchisee, mockSchedule)
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
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/times`
      );

      expect(req.request.method).toEqual('PUT');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });
});
