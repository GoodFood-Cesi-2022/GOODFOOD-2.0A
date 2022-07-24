import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { ProfileComponent } from "./profile.component";
import { environment } from "src/environments/environment";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore;
  let httpTestingController: HttpTestingController;
  const initialState = { loggedIn: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
      declarations: [ProfileComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/users/current?includes[]=roles`);
    expect(req.request.method).toEqual(_HttpRequest.GET);
    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(store).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it("Firstname update", () => {
    component.updateField("FIRSTNAME");
    expect(store).toBeTruthy();
    expect(component).toBeTruthy();
  });
});
