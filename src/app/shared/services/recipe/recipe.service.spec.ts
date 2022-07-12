import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RecipeService } from './recipe.service';
import { Recipe } from '../../models/recipe.model';
import { environment } from 'src/environments/environment';

// https://angular.io/guide/testing-services
describe('RecipeService (with mocks)', () => {
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
  describe('get all recipes', () => {
    let getAll: Recipe[];

    beforeEach(() => {
      service = TestBed.inject(RecipeService);
      getAll = [
        {
          id: 1,
          name: 'string',
          star: true,
          base_price: 1,
          description: 'string',
          ingredients: [
            {
              id: 1,
              name: 'string',
              allergen: false,
              types: [
                {
                  id: 1,
                  code: 'string',
                  name: 'string',
                  description: 'string',
                },
              ],
            },
          ],
          recipe_type: {
            code: 'string',
            name: 'string',
            description: 'string',
          },
          available_at: new Date('2019-08-24T14:15:22Z'),
          pictures: [
            {
              uuid: 'string',
              name: 'string',
              size_unit: 'string',
            },
          ],
        },
        {
          id: 2,
          name: 'string',
          star: true,
          base_price: '1',
          description: 'string',
          ingredients: [
            {
              id: 2,
              name: 'string',
              allergen: false,
              types: [
                {
                  id: 1,
                  code: 'string',
                  name: 'string',
                  description: 'string',
                },
              ],
            },
          ],
          recipe_type: {
            code: 'string',
            name: 'string',
            description: 'string',
          },
          available_at: new Date('2019-08-24T14:19:22Z'),
          pictures: [
            {
              uuid: 'string',
              name: 'string',
              size_unit: 'string',
            },
          ],
        },
      ] as Recipe[];
    });

    it('shoud return ALL recipes from API', () => {
      service.getRecipes().subscribe({
        next: (recipes) => 
          expect(recipes).withContext('should return all recipes').toEqual(getAll),
        error: fail,
      });

      /* RecipeService should have made one request to GET recipes from expected URL */
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/recipes?includes[]=pictures`
      );
      expect(req.request.method).toBe('GET');
      // Respond with the mock recipes
      req.flush({message:'Sucessc', getAll });
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
    //   requests[1].flush([
    //     {
    //       id: 1,
    //       name: 'string',
    //       description: 'string',
    //       base_price: 1,
    //       star: true,
    //       ingredients: [
    //         {
    //           id: 1,
    //           name: 'string',
    //           allergen: false,
    //           types: [
    //             {
    //               id: 1,
    //               name: 'string',
    //               code: 'string',
    //               description: 'string',
    //             },
    //           ],
    //         },
    //       ],
    //       recipe_type: {
    //         id: 1,
    //         code: 'string',
    //         name: 'string',
    //         description: 'string',
    //       },
    //       available_at: new Date('2019-08-24T14:15:22Z'),
    //       pictures: [
    //         {
    //           uuid: 'string',
    //           name: 'string',
    //           size: 1,
    //           size_unit: 'string',
    //         },
    //       ],
    //     },
    //   ]);
    //   requests[2].flush(getAll);
    // });
  });
});
