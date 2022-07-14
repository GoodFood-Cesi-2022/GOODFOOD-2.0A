import { Ingredient } from './../../models/ingredient.model';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IngredientService } from './ingredient.service';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';

describe('IngredientService', () => {
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
    let getAll: Ingredient[];

    beforeEach(() => {
      service = TestBed.inject(IngredientService);
      getAll = [
        {
          id: 1,
          name: 'Apple',
          allergen: true,
          types: [
            {
              id: 1,
              code: 'fruits',
              name: 'fruits',
              description: 'string',
            },
          ],
        },
        {
          id: 2,
          name: 'Salmon',
          allergen: false,
          types: [
            {
              id: 2,
              code: 'fish',
              name: 'fish',
              description: 'description 2',
            },
          ],
        },
      ] as Ingredient[];
    });

    it('should return ingredient (called once)', () => {
      service.getIngredients().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return all ingredients')
            .toEqual(getAll),
        error: fail,
      });

      // IngredientService should have made one request to GET ingredient from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock ingredients
      req.flush(getAll);
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
      req.flush(getAll);
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
      req.flush([]); // Respond with no ingredient
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = '404 Not Found';
      service.getIngredients().subscribe({
        next: (_values) => fail('expected to fail'),
        error: (error) => expect(error.message).toContain(msg),
      });
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients`
      );

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return ingredient (called multiple times)', () => {
      service.getIngredients().subscribe();
      service.getIngredients().subscribe();
      service.getIngredients().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return ingredient')
            .toEqual(getAll),
        error: fail,
      });

      const requests = httpTestingController.match(
        `${environment.apiBaseUrl}/ingredients`
      );
      expect(requests.length)
        .withContext('calls to getIngredients()')
        .toEqual(3);

      // Respond to each request with different mock ingredient results
      requests[0].flush([]);
      requests[1].flush([
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
      ]);
      requests[2].flush(getAll);
    });
  });

  describe('#updateIngredient', () => {
    // Expecting the query form of URL so should not 404 when id not found
    // const makeUrl = (id: number) =>
    //   `${environment.apiBaseUrl}/ingredients/${id}`;

    it('should update an ingredient and return it', () => {
      const update: Ingredient = {
        id: 1,
        name: 'Apple',
        allergen: true,
        types: [
          {
            id: 1,
            code: 'fruits',
            name: 'fruits',
            description: 'string',
          },
        ],
      };

      service.updateIngredient(update).subscribe({
        next: (data) =>
          expect(data)
            .withContext('should return the ingredient')
            .toEqual(data),
        error: fail,
      });

      // IngredientService should have made one request to PUT ingredient
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/${update}`
      );
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(update);

      // Expect server to return the ingredient after PUT
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: update,
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = '404 Not Found';
      const update: Ingredient = { id: 1, name: 'A' };
      service.updateIngredient(update).subscribe({
        next: (_values) => fail('expected to fail'),
        error: (error) => expect(error.message).toContain(msg),
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/${update}`
      );

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should turn network error into user-facing error', (done) => {
      // Create mock ProgressEvent with type `error`, raised when something goes wrong at
      // the network level. Connection timeout, DNS error, offline, etc.
      const errorEvent = new ProgressEvent('error');

      const update: Ingredient = { id: 1 };
      service.updateIngredient(update).subscribe({
        next: (_values) => fail('expected to fail'),
        error: (error) => {
          expect(error).toBe(errorEvent);
          done();
        },
      });
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients/${update}`
      );

      // Respond with mock error
      req.error(errorEvent);
    });
  });
});
