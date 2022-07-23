import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MessageService } from "primeng/api";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FranchiseeDetailComponent } from "./franchisee-detail.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";
import { mockFranchisee } from "src/app/shared/mock/franchisee.mock";

describe("FranchiseeDetailComponent", () => {
  let component: FranchiseeDetailComponent;
  let fixture: ComponentFixture<FranchiseeDetailComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ id: 1 }]),
          },
        },
      ],
      declarations: [FranchiseeDetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeDetailComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req2 = httpTestingController.expectOne(`${environment.apiBaseUrl}/contractors`);
    expect(req2.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req2.flush(mockFranchisee);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
