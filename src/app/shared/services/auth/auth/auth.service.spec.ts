import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";
import { mockUserAuth, mockUserWithAuth } from "src/app/shared/mock/users.mock";
import { environment } from "src/environments/environment";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("get current user", () => {
    service.getUser().subscribe((data): void => {
      expect(data).toEqual(mockUserWithAuth);
    });
    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/users/current?includes[]=roles`);
    expect(req.request.method).toEqual(_HttpRequest.GET);

    expect(req.request.body).toEqual(null);

    req.flush(mockUserAuth);
  });

  it("isAuthenticated function check", () => {
    let test: boolean;
    test = service.isAuthenticated();
    expect(test).toBeFalsy();
  });
});
