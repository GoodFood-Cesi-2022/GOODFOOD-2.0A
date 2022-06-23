import { TestBed } from '@angular/core/testing';

import { IngredientTypeService } from './ingredient-type.service';

describe('IngredientTypeService', () => {
  let service: IngredientTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
