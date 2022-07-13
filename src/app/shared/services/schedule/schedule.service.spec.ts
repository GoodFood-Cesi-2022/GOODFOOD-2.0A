import { Franchisee } from 'src/app/shared/models/franchisee.model';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Schedule } from '../../models/schedule.model';
import { ScheduleService } from './schedule.service';
import { environment } from 'src/environments/environment';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScheduleService],
    });
    service = TestBed.inject(ScheduleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get all schedules', () => {
    let getSchedule: Schedule;

    beforeEach(() => {
      service = TestBed.inject(ScheduleService);
      getSchedule = {
        monday: {
          lunch: {
            opened_at: 'close',
            closed_at: 'close',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        tuesday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        wednesday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        thursday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        friday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        saturday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        sunday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
      } as Schedule;
    });

    it('should return schedule (called once)', () => {
      const franchisee_id: Franchisee = { id: 1 };
      service.getSchedule(franchisee_id).subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return all schedule')
            .toEqual(getSchedule),
        error: fail,
      });

      // ScheduleService should have made one request to GET schedule from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${franchisee_id}/times`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock schedule
      req.flush(getSchedule);
    });

    it('should be OK returning no schedule', () => {
      const franchisee_id: Franchisee = { id: 1 };
      service.getSchedule(franchisee_id).subscribe({
        next: (values) =>
          expect(values.friday.lunch.closed_at.length)
            .withContext('should have empty schedule array')
            .toEqual(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${franchisee_id}/times`
      );
      req.flush([]); // Respond with no schedule
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = '404 Not Found';
      const franchisee_id: Franchisee = { id: 1 };
      service.getSchedule(franchisee_id).subscribe({
        next: (_values) => fail('expected to fail'),
        error: (error) => expect(error.message).toContain(msg),
      });
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${franchisee_id}/times`
      );

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return schedule (called multiple times)', () => {
      const franchisee_id: Franchisee = { id: 1 };
      service.getSchedule(franchisee_id).subscribe();
      service.getSchedule(franchisee_id).subscribe();
      service.getSchedule(franchisee_id).subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return schedule')
            .toEqual(getSchedule),
        error: fail,
      });

      const requests = httpTestingController.match(
        `${environment.apiBaseUrl}/contractors/${franchisee_id}/times`
      );
      expect(requests.length).withContext('calls to schedule()').toEqual(2);

      // Respond to each request with different mock hero results
      requests[0].flush({});
      requests[1].flush({
        monday: {
          lunch: {
            opened_at: 'close',
            closed_at: 'close',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        tuesday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        wednesday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        thursday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        friday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        saturday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
        sunday: {
          lunch: {
            opened_at: 'string',
            closed_at: 'string',
          },
          night: {
            opened_at: 'string',
            closed_at: 'string',
          },
        },
      });
      requests[2].flush(getSchedule);
    });
  });
});
