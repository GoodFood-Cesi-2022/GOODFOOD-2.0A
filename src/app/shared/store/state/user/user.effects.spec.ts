import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Actions } from "@ngrx/effects";
import { ScannedActionsSubject } from "@ngrx/store";
import { UserEffects } from "./user.effects";

describe("User Effects", () => {
  let effects: UserEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserEffects, Actions, ScannedActionsSubject],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    effects = TestBed.inject(UserEffects);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
