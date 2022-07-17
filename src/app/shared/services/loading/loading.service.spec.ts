import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RecipeService } from '../recipe/recipe.service';

import { LoadingService } from './loading.service';

fdescribe('LoadingService', () => {
  let service: LoadingService;
  let recipe: RecipeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [RecipeService],
    });
    service = TestBed.inject(LoadingService);
    recipe = TestBed.inject(RecipeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run until completed', () => {
    service.loadingOn();
    service.showLoaderUntilCompleted(recipe.getRecipes());
    service.loadingOff();
    expect(service).toBeTruthy();
  });
});
