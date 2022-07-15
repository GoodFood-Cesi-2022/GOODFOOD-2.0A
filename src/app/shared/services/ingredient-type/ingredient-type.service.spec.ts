import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { of, catchError, tap } from 'rxjs';

import { IngredientTypeService } from './ingredient-type.service';
import { environment } from 'src/environments/environment';
import {
  mockType1,
  mockType2,
  mockTypeArray,
} from 'src/app/shared/mock/ingredient-type.mock';

fdescribe('IngredientTypeService', () => {
  let service: IngredientTypeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IngredientTypeService],
    });
    service = TestBed.inject(IngredientTypeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call getIngredientsTypes()', () => {
    beforeEach(() => {
      service = TestBed.inject(IngredientTypeService);
    });

    it('should return ingredient-types (called once)', () => {
      service.getIngredientsTypes().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return all ingredient-types')
            .toEqual(mockTypeArray),
        error: fail,
      });

      // IngredientTypeService should have made one request to GET ingredient-types from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock ingredient-types
      req.flush(mockTypeArray);
    });

    it('should be OK returning no ingredient-types', () => {
      service.getIngredientsTypes().subscribe({
        next: (values) =>
          expect(values.length)
            .withContext('should have empty ingredient-types array')
            .toEqual(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types`
      );
      req.flush([]); // Respond with no ingredient-types
    });

    it('should return ingredient-types (called multiple times)', () => {
      service.getIngredientsTypes().subscribe();
      service.getIngredientsTypes().subscribe();
      service.getIngredientsTypes().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return ingredient-types')
            .toEqual(mockTypeArray),
        error: fail,
      });

      const requests = httpTestingController.match(
        `${environment.apiBaseUrl}/ingredients/types`
      );
      expect(requests.length)
        .withContext('calls to getIngredientsTypes()')
        .toEqual(3);

      // Respond to each request with different mock ingredient-type results
      requests[0].flush([]);
      requests[1].flush([
        {
          id: 1,
          code: 'vegetables',
          name: 'vegetables',
          description: 'description',
        },
      ]);
      requests[2].flush(mockTypeArray);
    });

    it('call API & should handle errors', () => {
      service
        .getIngredientsTypes()
        .pipe(
          catchError((error: Error) => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_voices) => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response) => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types`
      );

      expect(req.request.method).toEqual('GET');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call createIngredientType()', () => {
    beforeEach(() => {
      service = TestBed.inject(IngredientTypeService);
    });

    it('should return new ingredient-type', () => {
      service.createIngredientType(mockType2).subscribe((data) => {
        expect(data).toEqual(mockType2);
      });

      // IngredientTypeService should have made one request to POST ingredient-types from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types`
      );
      expect(req.request.method).toEqual('POST');

      // Respond with the mock ingredient-types
      req.flush(mockType2);
    });

    it('call API & should handle errors', () => {
      service
        .createIngredientType(mockType1)
        .pipe(
          catchError((error: Error) => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_voices) => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response) => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types`
      );

      expect(req.request.method).toEqual('POST');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call updateIngredientType()', () => {
    beforeEach(() => {
      service = TestBed.inject(IngredientTypeService);
    });

    it('should update ingredient-type and return it', () => {
      service.updateIngredientType(mockType1).subscribe({
        next: (data) =>
          expect(data)
            .withContext('should return the ingredient-type')
            .toEqual(data),
        error: fail,
      });

      // IngredientTypeService should have made one request to POST ingredient-types from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types/${mockType1.id}`
      );
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(mockType1);

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: mockType1,
      });
      req.event(expectedResponse);
    });

    it('call API & should handle errors', () => {
      service
        .updateIngredientType(mockType1)
        .pipe(
          catchError((error: Error) => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_voices) => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response) => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types/${mockType1.id}`
      );

      expect(req.request.method).toEqual('PUT');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call deleteIngredientType()', () => {
    beforeEach(() => {
      service = TestBed.inject(IngredientTypeService);
    });

    it('should delete ingredient-type and return success message', () => {
      service.deleteIngredientType(mockType1.id).subscribe({
        next: (data) =>
          expect(data)
            .withContext('should return the success message')
            .toEqual('204 No Content'),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types/${mockType1.id}`
      );
      expect(req.request.method).toEqual('DELETE');
    });

    it('call API & should handle errors', () => {
      service
        .deleteIngredientType(mockType1.id)
        .pipe(
          catchError((error: Error) => {
            expect(error).toBeDefined();
            return of();
          }),
          tap((_voices) => {
            fail('next handler must not be called');
          })
        )
        .subscribe((_response) => {
          fail('expected to fail');
        });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/types/${mockType1.id}`
      );

      expect(req.request.method).toEqual('DELETE');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });
});
