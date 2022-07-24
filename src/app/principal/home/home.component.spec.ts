import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HomeComponent } from "./home.component";

import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";
import { environment } from "src/environments/environment";
import { mockUser1 } from "src/app/shared/mock/users.mock";
import { mockFranchisee } from "src/app/shared/mock/franchisee.mock";
import { mockIngredientArray } from "src/app/shared/mock/ingredients.mock";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req1 = httpTestingController.expectOne(`${environment.apiBaseUrl}/users`);
    expect(req1.request.method).toEqual(_HttpRequest.GET);
    req1.flush(mockUser1);

    const req2 = httpTestingController.expectOne(`${environment.apiBaseUrl}/contractors`);
    expect(req2.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock address
    req2.flush(mockFranchisee);

    const req3 = httpTestingController.expectOne(`${environment.apiBaseUrl}/recipes?includes[]=pictures`);
    expect(req3.request.method).toEqual(_HttpRequest.GET);
    req3.flush({});

    const req4 = httpTestingController.expectOne(`${environment.apiBaseUrl}/ingredients`);
    expect(req4.request.method).toEqual(_HttpRequest.GET);
    req4.flush({ data: mockIngredientArray });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
