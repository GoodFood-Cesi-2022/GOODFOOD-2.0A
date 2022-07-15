import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { catchError, of, tap } from 'rxjs';

import { IngredientService } from './ingredient.service';
import { environment } from 'src/environments/environment';
import { mockIngre1, mockIngredientArray } from '../../mock/ingredients.mock';

fdescribe('IngredientService', () => {
  let service: IngredientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IngredientService],
    });
    service = TestBed.inject(IngredientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get all ingredient', () => {
    beforeEach(() => {
      service = TestBed.inject(IngredientService);
    });

    it('should return ingredient (called once)', () => {
      service.getIngredients().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return all ingredients')
            .toEqual(mockIngredientArray),
        error: fail,
      });

      // IngredientService should have made one request to GET ingredient from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock ingredients
      req.flush({ data: mockIngredientArray });
    });

    it('should return ingredient array length => 2', () => {
      service.getIngredients().subscribe({
        next: (values) => expect(values.length).toBe(2),
      });

      // IngredientService should have made one request to GET ingredient from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock ingredients
      req.flush(mockIngredientArray);
    });

    it('should be OK returning no ingredient', () => {
      service.getIngredients().subscribe({
        next: (values) =>
          expect(values.length)
            .withContext('should have empty ingredients array')
            .toEqual(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients`
      );
      req.flush({ data: [] }); // Respond with no ingredient
    });

    it('should return ingredient (called multiple times)', () => {
      service.getIngredients().subscribe();
      service.getIngredients().subscribe();
      service.getIngredients().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return ingredient')
            .toEqual(mockIngredientArray),
        error: fail,
      });

      const requests = httpTestingController.match(
        `${environment.apiBaseUrl}/ingredients`
      );
      expect(requests.length)
        .withContext('calls to getIngredients()')
        .toEqual(3);

      // Respond to each request with different mock ingredient results
      requests[0].flush({ data: [] });
      requests[1].flush({
        data: [
          {
            id: 3,
            name: 'potato',
            allergen: true,
            types: [
              {
                id: 1,
                code: 'vegetable',
                name: 'vegetable',
                description: '',
              },
            ],
          },
        ],
      });
      requests[2].flush({ data: mockIngredientArray });
    });

    it('call API & should handle errors', () => {
      service
        .getIngredients()
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
        `${environment.apiBaseUrl}/ingredients`
      );

      expect(req.request.method).toEqual('GET');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call createIngredient()', () => {
    beforeEach(() => {
      service = TestBed.inject(IngredientService);
    });

    it('should return new ingredient', () => {
      service.createIngredient(mockIngre1).subscribe((data) => {
        expect(data).toEqual(data);
      });

      // IngredientService should have made one request to POST ingredient from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients`
      );
      expect(req.request.method).toEqual('POST');

      // Respond with the mock ingredient
      req.flush(mockIngre1);
    });

    it('call API & should handle errors', () => {
      service
        .createIngredient(mockIngre1)
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
        `${environment.apiBaseUrl}/ingredients`
      );

      expect(req.request.method).toEqual('POST');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call updateIngredient()', () => {
    beforeEach(() => {
      service = TestBed.inject(IngredientService);
    });

    it('should return new ingredient', () => {
      service.updateIngredient(mockIngre1).subscribe((data) => {
        expect(data).toEqual(data);
      });

      // IngredientService should have made one request to POST ingredient from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/${mockIngre1.id}`
      );
      expect(req.request.method).toEqual('PUT');

      // Respond with the mock ingredient
      req.flush(mockIngre1);
    });

    it('call API & should handle errors', () => {
      service
        .updateIngredient(mockIngre1)
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
        `${environment.apiBaseUrl}/ingredients/${mockIngre1.id}`
      );

      expect(req.request.method).toEqual('PUT');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call deleteIngredient()', () => {
    beforeEach(() => {
      service = TestBed.inject(IngredientService);
    });

    it('should delete ingredient and return success message', () => {
      service.deleteIngredient(mockIngre1.id).subscribe({
        next: (data) =>
          expect(data)
            .withContext('should return the success message')
            .toEqual('204 No Content'),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/${mockIngre1.id}`
      );
      expect(req.request.method).toEqual('DELETE');
    });

    it('call API & should handle errors', () => {
      service
        .deleteIngredient(mockIngre1.id)
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
        `${environment.apiBaseUrl}/ingredients/${mockIngre1.id}`
      );

      expect(req.request.method).toEqual('DELETE');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });
});
