import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { catchError, of, tap } from 'rxjs';

import { RecipeService } from './recipe.service';
import { environment } from 'src/environments/environment';
import {
  mockRecipe1,
  mockRecipe2,
  mockRecipeArray,
} from '../../mock/recipe.mock';
import { mockRecipeTypeArray } from '../../mock/recipe-type.mock';

// https://angular.io/guide/testing-services
fdescribe('RecipeService (with mocks)', () => {
  let service: RecipeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [RecipeService],
    });

    /*
     * Inject the http, test controller, and service-under-test
     * as they will be referenced by each test.
     */
    service = TestBed.inject(RecipeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* RecipeService method tests begin */
  describe('get all recipes()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('shoud return ALL recipes from API (called once)', () => {
      service.getRecipes().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return all recipes')
            .toEqual(mockRecipeArray),
        error: fail,
      });

      /* RecipeService should have made one request to GET recipes from expected URL */
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes?includes[]=pictures`
      );
      expect(req.request.method).toBe('GET');
      // Respond with the mock recipes
      req.flush({ message: 'Success', data: mockRecipeArray });
    });

    it('call API & should handle errors', () => {
      service
        .getRecipes()
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
        `${environment.apiBaseUrl}/recipes?includes[]=pictures`
      );

      expect(req.request.method).toEqual('GET');
      req.error(new ProgressEvent('TEST_ERROR'));
    });

    // it('should be OK returning no recipes', () => {
    //   service.getRecipes().subscribe({
    //     next: (recipes) =>
    //       expect(recipes.length)
    //         .withContext('should have empty recipes array')
    //         .toEqual(0),
    //     error: fail,
    //   });

    //   const req = httpTestingController.expectOne(
    //     `${environment.apiBaseUrl}/recipes?includes[]=pictures`
    //   );
    //   req.flush([]); // Respond with no recipes
    // });

    // it('should turn 404 into a user-friendly error', () => {
    //   const msg = 'Deliberate 404';
    //   service.getRecipes().subscribe({
    //     next: (recipes) => fail('expected to fail'),
    //     error: (error) => expect(error.message).toContain(msg),
    //   });
    //   const req = httpTestingController.expectOne(
    //     `${environment.apiBaseUrl}/recipes?includes[]=pictures`
    //   );
    //   // respond with a 404 and the error message in the body
    //   req.flush(msg, { status: 404, statusText: 'Not Found' });
    // });

    // it('should return all recipes (called multiple times)', () => {
    //   service.getRecipes().subscribe();
    //   service.getRecipes().subscribe();
    //   service.getRecipes().subscribe({
    //     next: (recipes) =>
    //       expect(recipes)
    //         .withContext('should return all recipes')
    //         .toEqual(getAll),
    //     error: fail,
    //   });

    //   const requests = httpTestingController.match(
    //     `${environment.apiBaseUrl}/recipes?includes[]=pictures`
    //   );
    //   expect(requests.length).withContext('calls to getRecipes()').toEqual(3);

    //   // Respond to each request with different mock recipe results
    //   requests[0].flush([]);
    //   requests[1].flush([],
    //     },
    //   ]);
    //   requests[2].flush(getAll);
    // });
  });

  describe('should call getRecipeType()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('should return new recipe-type', () => {
      service.getRecipeType().subscribe((data) => {
        expect(data).toEqual(mockRecipeTypeArray);
      });

      // RecipeTypeService should have made one request to GET recipe-type from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes/types`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock recipe-type
      req.flush(mockRecipeTypeArray);
    });

    it('call API & should handle errors', () => {
      service
        .getRecipeType()
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
        `${environment.apiBaseUrl}/recipes/types`
      );

      expect(req.request.method).toEqual('GET');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call createRecipe()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('should return new recipe', () => {
      service.createRecipe(mockRecipe2).subscribe((data) => {
        expect(data).toEqual(mockRecipe2);
      });

      // RecipeService should have made one request to POST recipe from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes`
      );
      expect(req.request.method).toEqual('POST');

      // Respond with the mock recipe
      req.flush(mockRecipe2);
    });

    it('call API & should handle errors', () => {
      service
        .createRecipe(mockRecipe2)
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
        `${environment.apiBaseUrl}/recipes`
      );

      expect(req.request.method).toEqual('POST');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call updateRecipe()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('should return new recipe', () => {
      service.updateRecipe(mockRecipe1).subscribe((data) => {
        expect(data).toEqual(data);
      });

      // RecipeService should have made one request to POST recipe from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}`
      );
      expect(req.request.method).toEqual('PUT');

      // Respond with the mock recipe
      req.flush(mockRecipe1);
    });

    it('call API & should handle errors', () => {
      service
        .updateRecipe(mockRecipe1)
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
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}`
      );

      expect(req.request.method).toEqual('PUT');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call deleteRecipe()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('should delete recipe and return success message', () => {
      service.deleteRecipe(mockRecipe1.id).subscribe({
        next: (data) =>
          expect(data)
            .withContext('should return the success message')
            .toEqual('204 No Content'),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}`
      );
      expect(req.request.method).toEqual('DELETE');
    });

    it('call API & should handle errors', () => {
      service
        .deleteRecipe(mockRecipe1.id)
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
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}`
      );

      expect(req.request.method).toEqual('DELETE');
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });
});
