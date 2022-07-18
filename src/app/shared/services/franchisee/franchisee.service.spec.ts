import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Message } from '../../constants/constants';
import { mockFranchiseeRecipe1 } from '../../mock/fracnhisee-recipe.mock';
import { mockFranchisee } from '../../mock/franchisee.mock';
import { mockRecipeArray } from '../../mock/recipe.mock';
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

  // create
  describe('should call newFranchisee()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(FranchiseeService);
    });

    it('should return new address', (): void => {
      service
        .newFranchisee(mockFranchisee, mockFranchisee.owned_by)
        .subscribe((data): void => {
          expect(data).toEqual(mockFranchisee);
        });

      // AddressService should have made one request to POST address from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors`
      );
      expect(req.request.method).toEqual('POST');

      expect(req.request.body).toEqual(mockFranchisee);

      // Respond with the mock address
      req.flush(mockFranchisee);
    });
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
            .toEqual(Message.DELETE),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush({ message: Message.DELETE });
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

  describe('should call getFranchiseeRecipes()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(FranchiseeService);
    });

    it('should return all Franchisee Recipes', (): void => {
      service.getFranchiseeRecipes(mockFranchisee).subscribe((data): void => {
        expect(data).toEqual(mockRecipeArray);
      });

      // AddressService should have made one request to POST address from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/recipes`
      );
      expect(req.request.method).toEqual('GET');

      expect(req.request.body).toEqual(null);

      // Respond with the mock address
      req.flush({ data: mockRecipeArray });
    });
  });

  describe('should call updateFranchisee()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(FranchiseeService);
    });

    it('should update Franchisee', (): void => {
      service.updateFranchisee(mockFranchisee).subscribe((data): void => {
        expect(data).toEqual(mockFranchisee);
      });

      // AddressService should have made one request to POST address from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors`
      );
      expect(req.request.method).toEqual('PUT');

      expect(req.request.body).toEqual(mockFranchisee);

      // Respond with the mock address
      req.flush(mockFranchisee);
    });
  });

  describe('should call addRecipe()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(FranchiseeService);
    });

    it('should add a recipe to a franchisee', (): void => {
      service
        .addRecipe(mockFranchisee, mockFranchiseeRecipe1)
        .subscribe((data): void => {
          expect(data).toEqual(mockFranchiseeRecipe1);
        });

      // AddressService should have made one request to POST address from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/recipes`
      );
      expect(req.request.method).toEqual('POST');

      expect(req.request.body).toEqual(mockFranchiseeRecipe1);

      // Respond with the mock address
      req.flush(mockFranchiseeRecipe1);
    });
  });

  describe('should call updateRecipePrice()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(FranchiseeService);
    });

    it("should update the price of a franchisee's recipe", (): void => {
      service
        .updateRecipePrice(mockFranchisee, mockFranchiseeRecipe1)
        .subscribe((data): void => {
          expect(data).toEqual(Message.UPDATE);
        });

      // AddressService should have made one request to POST address from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/recipes/${mockFranchiseeRecipe1.id}`
      );
      expect(req.request.method).toEqual('PUT');

      expect(req.request.body).toEqual(mockFranchiseeRecipe1);

      // Respond with the mock address
      req.flush({ message: Message.UPDATE });
    });
  });

  describe('should call removeRecipe()', (): void => {
    beforeEach((): void => {
      service = TestBed.inject(FranchiseeService);
    });

    it("should remove a recipe's from a franchisee's recipe list", (): void => {
      service
        .removeRecipe(mockFranchisee.id, mockFranchiseeRecipe1)
        .subscribe((data): void => {
          expect(data).toEqual(Message.UPDATE);
        });

      // AddressService should have made one request to POST address from URL
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/contractors/${mockFranchisee.id}/recipes/${mockFranchiseeRecipe1.id}`
      );
      expect(req.request.method).toEqual('DELETE');

      expect(req.request.body).toEqual(null);

      // Respond with the mock address
      req.flush({ message: Message.DELETE });
    });
  });
});
