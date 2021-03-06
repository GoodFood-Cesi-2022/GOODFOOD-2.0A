import { RecipeService } from "./../../../../shared/services/recipe/recipe.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ConfirmationService } from "primeng/api";

import { RecipesComponent } from "./recipes.component";
import { environment } from "src/environments/environment";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";

describe("RecipesComponent", () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;
  let httpTestingController: HttpTestingController;
  let service: RecipeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ConfirmationService],
      declarations: [RecipesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    component.CreateNewRecipe();
    component.updateRecipe(component);
    fixture.detectChanges();

    const req1 = httpTestingController.expectOne(`${environment.apiBaseUrl}/recipes?includes[]=pictures`);
    expect(req1.request.method).toEqual(_HttpRequest.GET);
    req1.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
