import { Ingredient } from './../../models/ingredient.model';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IngredientService } from './ingredient.service';
import { environment } from 'src/environments/environment';

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
    let getAll: Ingredient[];

    beforeEach(() => {
      service = TestBed.inject(IngredientService);
      getAll = [
        {
          id: 1,
          name: 'apple',
          allergen: true,
          types: [
            {
              id: 1,
              name: 'dessert',
              code: 'dessert',
              description: 'description 1',
              created_at: new Date('2019-08-24T14:15:22Z'),
              updated_at: new Date('2019-08-24T14:15:22Z'),
            },
          ],
          created_at: new Date('2019-08-27T14:15:20Z'),
          updated_at: new Date('2019-08-24T14:19:22Z'),
        },
        {
          id: 2,
          name: 'meat',
          allergen: false,
          types: [
            {
              id: 2,
              name: 'main course',
              code: 'main course',
              description: 'description 2',
              created_at: new Date('2019-08-24T14:15:22Z'),
              updated_at: new Date('2019-08-24T14:15:22Z'),
            },
          ],
          created_at: new Date('2019-08-24T14:15:22Z'),
          updated_at: new Date('2019-08-24T14:17:22Z'),
        },
      ] as Ingredient[];
    });

    it('should return ingredient (called once)', () => {
      service.getIngredients().subscribe({
        next: (values) =>
          expect(values)
            .withContext('should return all ingredient')
            .toEqual(getAll),
        error: fail,
      });

      // IngredientService should have made one request to GET ingredient from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/ingredients`
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock ingredient
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

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([
        {
          id: 1,
          code: 'vegetables',
          name: 'vegetables',
          description: 'description',
          created_at: new Date('2019-09-27T14:15:20Z'),
          updated_at: new Date('2019-09-24T14:15:22Z'),
        },
      ]);
      requests[2].flush(getAll);
    });
  });
});
