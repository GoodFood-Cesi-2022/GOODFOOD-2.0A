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
import { Message } from '../../constants/message.const';
import { mockIngredientArray } from '../../mock/ingredients.mock';
import { picture1 } from '../../mock/picture.mock';
import { _HttpRequest } from '../../constants/httpRequest.const';

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
      expect(req.request.method).toBe(_HttpRequest.GET);
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

      expect(req.request.method).toEqual(_HttpRequest.GET);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('get one recipes()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('shoud return ALL recipes from API (called once)', () => {
      service.getRecipe(mockRecipe1.id).subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return all recipes')
            .toEqual(mockRecipe1),
        error: fail,
      });

      /* RecipeService should have made one request to GET recipes from expected URL */
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}`
      );
      expect(req.request.method).toBe(_HttpRequest.GET);
      // Respond with the mock recipes
      req.flush(mockRecipe1);
    });
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
      expect(req.request.method).toEqual(_HttpRequest.GET);

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

      expect(req.request.method).toEqual(_HttpRequest.GET);
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
      expect(req.request.method).toEqual(_HttpRequest.POST);

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

      expect(req.request.method).toEqual(_HttpRequest.POST);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('should call updateRecipe()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('should return new recipe', () => {
      service.updateRecipe(mockRecipe1).subscribe((data) => {
        expect(data).toEqual(Message.UPDATE_SUCCESS);
      });

      // RecipeService should have made one request to POST recipe from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}`
      );
      expect(req.request.method).toEqual(_HttpRequest.PUT);

      // Respond with the mock recipe
      req.flush({ message: Message.UPDATE_SUCCESS });
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

      expect(req.request.method).toEqual(_HttpRequest.PUT);
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
            .toEqual(Message.DELETE),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}`
      );
      expect(req.request.method).toEqual(_HttpRequest.DELETE);
      req.flush({ message: Message.DELETE });
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

      expect(req.request.method).toEqual(_HttpRequest.DELETE);
      req.error(new ProgressEvent('TEST_ERROR'));
    });
  });

  describe('get ingredients recipe()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('shoud return ALL ingredients for a recipe', () => {
      service.getIngredientsByRecipeId(mockRecipe1.id).subscribe({
        next: (values) =>
          expect(values)
            .withContext('shoud return ALL ingredients for a recipe')
            .toEqual(mockIngredientArray),
        error: fail,
      });

      /* RecipeService should have made one request to GET recipes from expected URL */
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}/ingredients`
      );
      expect(req.request.method).toBe(_HttpRequest.GET);
      // Respond with the mock recipes
      req.flush(mockIngredientArray);
    });
  });

  describe('uploadPicture()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('shoud upload a picture', () => {
      service.uploadPicture(picture1).subscribe({
        next: (values) =>
          expect(values)
            .withContext('shoud upload a picture')
            .toEqual({ message: Message.UPDATE }),
        error: fail,
      });

      /* RecipeService should have made one request to GET recipes from expected URL */
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/files`
      );
      const formData = new FormData();

      formData.append('name', picture1.name);
      formData.append('filename', <string>(<unknown>picture1));
      expect(req.request.method).toBe(_HttpRequest.POST);
      expect(req.request.body).toEqual(formData);
      // Respond with the mock recipes
      req.flush({ message: Message.UPDATE });
    });
  });

  describe('attachPictures()', () => {
    beforeEach(() => {
      service = TestBed.inject(RecipeService);
    });

    it('shoud attach a picture to a recipe', () => {
      service.attachPictures(mockRecipe1, mockRecipe1).subscribe({
        next: (values) =>
          expect(values)
            .withContext('shoud return success of attachment')
            .toEqual(Message.UPDATE),
        error: fail,
      });

      /* RecipeService should have made one request to GET recipes from expected URL */
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes/${mockRecipe1.id}/pictures`
      );
      const formData = new FormData();
      formData.append('file_uuid', picture1.uuid);
      expect(req.request.method).toBe(_HttpRequest.POST);
      expect(req.request.body).toEqual(formData);
      // Respond with the mock recipes
      req.flush({ message: Message.UPDATE });
    });
  });
});
