import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { IngredientComponent } from "./ingredient.component";
import { environment } from "src/environments/environment";
import { mockIngredientArray } from "src/app/shared/mock/ingredients.mock";
import { mockTypeArray } from "src/app/shared/mock/ingredient-type.mock";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";

describe("IngredientComponent", () => {
  let component: IngredientComponent;
  let fixture: ComponentFixture<IngredientComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [IngredientComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    const req1 = httpTestingController.expectOne(`${environment.apiBaseUrl}/ingredients`);
    expect(req1.request.method).toEqual(_HttpRequest.GET);
    req1.flush({ data: mockIngredientArray });

    const req2 = httpTestingController.expectOne(`${environment.apiBaseUrl}/ingredients/types`);
    expect(req2.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req2.flush(mockTypeArray);

    expect(component).toBeTruthy();
  });
});
