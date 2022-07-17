import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError, Observable, of, tap } from 'rxjs';

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

  // TODO : getFranchisees()
  // TODO : getFranchiseeRecipes()
  // TODO : newFranchisee()
  // TODO : addStarRecipe()
  // TODO : updateRecipePrice()
  // TODO : removeRecipe()
  // delete
  describe('should call deleteFranchisee()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(FranchiseeService);
    });

    it('should delete franchisee and return success message', () => {
      service.deleteFranchisee(mockFranchisee.id).subscribe({
        next: (data): void =>
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

    it('call API & should handle errors', (): void => {
      service
        .deleteFranchisee(mockFranchisee.id)
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
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}`
      );

      expect(req.request.method).toEqual('DELETE');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });
});
