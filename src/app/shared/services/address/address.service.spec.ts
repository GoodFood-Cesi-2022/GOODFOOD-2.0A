import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AddressService } from './address.service';
import { environment } from 'src/environments/environment';
import { Address } from '../../models/address.model';

describe('AddressService', () => {
  let service: AddressService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddressService],
    });
    service = TestBed.inject(AddressService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // localhost:8080/api/users/{user_id}/addresses
  // describe('get all ingredient-types', () => {
  //   let getAll: Address[];

  //   beforeEach(() => {
  //     service = TestBed.inject(AddressService);
  //     getAll = [
  //       {
  //         id: 1,
  //         code: 'fish',
  //         name: 'fish',
  //         description: 'description',
  //       },
  //       {
  //         id: 2,
  //         code: 'meat',
  //         name: 'meat',
  //         description: 'description',
  //       },
  //     ] as Address[];
  //   });

  //   it('should return ingredient-types (called once)', () => {
  //     service.getIngredientsTypes().subscribe({
  //       next: (values) =>
  //         expect(values)
  //           .withContext('should return all ingredient-types')
  //           .toEqual(getAll),
  //       error: fail,
  //     });

  //     // IngredientTypeService should have made one request to GET ingredient-types from URL
  //     const req = httpTestingController.expectOne(
  //       `${environment.apiBaseUrl}/ingredients/types`
  //     );
  //     expect(req.request.method).toEqual('GET');

  //     // Respond with the mock ingredient-types
  //     req.flush(getAll);
  //   });

  //   it('should be OK returning no ingredient-types', () => {
  //     service.getIngredientsTypes().subscribe({
  //       next: (values) =>
  //         expect(values.length)
  //           .withContext('should have empty ingredient-types array')
  //           .toEqual(0),
  //       error: fail,
  //     });

  //     const req = httpTestingController.expectOne(
  //       `${environment.apiBaseUrl}/ingredients/types`
  //     );
  //     req.flush([]); // Respond with no ingredient-types
  //   });

  //   it('should turn 404 into a user-friendly error', () => {
  //     const msg = '404 Not Found';
  //     service.getIngredientsTypes().subscribe({
  //       next: (_values) => fail('expected to fail'),
  //       error: (error) => expect(error.message).toContain(msg),
  //     });
  //     const req = httpTestingController.expectOne(
  //       `${environment.apiBaseUrl}/ingredients/types`
  //     );

  //     // respond with a 404 and the error message in the body
  //     req.flush(msg, { status: 404, statusText: 'Not Found' });
  //   });

  //   it('should return ingredient-types (called multiple times)', () => {
  //     service.getIngredientsTypes().subscribe();
  //     service.getIngredientsTypes().subscribe();
  //     service.getIngredientsTypes().subscribe({
  //       next: (values) =>
  //         expect(values)
  //           .withContext('should return ingredient-types')
  //           .toEqual(getAll),
  //       error: fail,
  //     });

  //     const requests = httpTestingController.match(
  //       `${environment.apiBaseUrl}/ingredients/types`
  //     );
  //     expect(requests.length)
  //       .withContext('calls to getIngredientsTypes()')
  //       .toEqual(3);

  //     // Respond to each request with different mock hero results
  //     requests[0].flush([]);
  //     requests[1].flush([
  //       {
  //         id: 1,
  //         code: 'vegetables',
  //         name: 'vegetables',
  //         description: 'description',
  //       },
  //     ]);
  //     requests[2].flush(getAll);
  //   });
  // });
});
