import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { mockFranchisee } from '../../mock/franchisee.mock';
import { FranchiseeService } from './franchisee.service';

fdescribe('FranchiseeService', (): void => {
  let service: FranchiseeService;
  let httpTestingController: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FranchiseeService],
    });

    service = TestBed.inject(FranchiseeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach((): void => {
    httpTestingController.verify();
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  describe('should call deleteFranchisee()', () => {
    beforeEach(() => {
      service = TestBed.inject(FranchiseeService);
    });

    it('should delete franchisee and return success message', () => {
      service.deleteFranchisee(mockFranchisee.id).subscribe({
        next: (data) =>
          expect(data)
            .withContext('should return the success message')
            .toEqual('204 No Content'),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}`
      );
      expect(req.request.method).toEqual('DELETE');
    });

    it('call API & should handle errors', () => {
      service
        .deleteFranchisee(mockFranchisee.id)
        .pipe(
          catchError((error: Error) => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_value) => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response) => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}`
      );

      expect(req.request.method).toEqual('DELETE');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });
});
