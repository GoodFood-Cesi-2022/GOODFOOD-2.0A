import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";
import { mockRole1 } from "src/app/shared/mock/role.mock";
import {
  mockUser1,
  mockUserAuth,
  mockUserAuth1,
  mockUserWithAuth,
  mockUserWithAuth1,
} from "src/app/shared/mock/users.mock";
import { User } from "src/app/shared/models/user.model";
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

  it("get user by id", () => {
    service.getUserById(mockUser1.id).subscribe((data): void => {
      expect(data).toEqual(mockUser1);
    });
    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/users/${mockUser1.id}`);
    expect(req.request.method).toEqual(_HttpRequest.GET);

    expect(req.request.body).toEqual(null);

    req.flush(mockUser1);
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

  it("get current user async", () => {
    service.getCurrentUser();

    const req1 = httpTestingController.expectOne(`${environment.apiBaseUrl}/users/current`);
    expect(req1.request.method).toEqual(_HttpRequest.GET);

    expect(req1.request.body).toEqual(null);

    req1.flush(mockUserAuth1);
  });

  it("get current user remote async", () => {
    service.getCurrentUserRemote();

    const req1 = httpTestingController.expectOne(`${environment.apiBaseUrl}/users/current`);
    expect(req1.request.method).toEqual(_HttpRequest.GET);

    expect(req1.request.body).toEqual(null);

    req1.flush(mockUserAuth1);
  });

  it("get role", () => {
    service.getUserRole(mockUserAuth).subscribe((data): void => {
      expect(data).toEqual(mockUserWithAuth);
    });
    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/users/${mockUserAuth.id}/roles`);
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
