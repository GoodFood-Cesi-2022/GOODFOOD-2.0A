import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { InputNumberModule } from "primeng/inputnumber";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";
import { Message } from "src/app/shared/constants/message.const";
import { mockAddress } from "src/app/shared/mock/address.mock";
import { mockFranchisee, mockFranchiseeArray } from "src/app/shared/mock/franchisee.mock";
import { mockSchedule } from "src/app/shared/mock/schedule.mock";
import { mockUser1 } from "src/app/shared/mock/users.mock";

import { AddressService } from "src/app/shared/services/address/address.service";
import { FranchiseeService } from "src/app/shared/services/franchisee/franchisee.service";
import { LoadingService } from "src/app/shared/services/loading/loading.service";
import { environment } from "src/environments/environment";
import { FranchiseeDialogComponent } from "./franchisee-dialog.component";

describe("FranchiseeDialogComponent mode Creation", () => {
  let component: FranchiseeDialogComponent;
  let fixture: ComponentFixture<FranchiseeDialogComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, InputNumberModule],
      declarations: [FranchiseeDialogComponent],
      providers: [
        FormBuilder,
        FranchiseeService,
        AddressService,
        LoadingService,
        MessageService,
        DynamicDialogRef,
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: { mode: "CREATE", franchisee: mockFranchisee, owner: mockUser1 },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeDialogComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/contractors`);
    expect(req.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req.flush(mockFranchiseeArray);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should HAVE franchisees", () => {
    expect(component.franchisee).toBeTruthy();
    // expect(component.franchiseeArray.length)
    //   .withContext("should have all franchisees after service promise resolves")
    //   .toBeGreaterThan(0);
  });

  it("submit franchisee for creation", () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls["name"].setValue("fruits");
    component.form.controls["phone"].setValue("0122334455");
    component.form.controls["email"].setValue("test@test.com");
    component.form.controls["radius"].setValue(5);
    component.form.controls["first_line"].setValue("4 rue blabla");
    component.form.controls["second_line"].setValue("");
    component.form.controls["zip_code"].setValue("38000");
    component.form.controls["city"].setValue("Grenoble");
    component.form.controls["country"].setValue("France");

    expect(component.form.valid).toBeTruthy();

    // Trigger the func
    (component as any).getFormValues();

    (component as any).onSubmit();

    const req1 = httpTestingController.expectOne(`${environment.apiBaseUrl}/addresses`);
    expect(req1.request.method).toEqual(_HttpRequest.POST);

    req1.flush({ message: Message.UPDATE });

    const req2 = httpTestingController.expectOne(`${environment.apiBaseUrl}/contractors`);
    expect(req2.request.method).toEqual(_HttpRequest.POST);

    req2.flush({ message: Message.UPDATE });
  });

  it("should close", () => {
    component.onClose();
    expect(component).toBeTruthy();
  });
});

describe("FranchiseeDialogComponent mode Update", () => {
  let component: FranchiseeDialogComponent;
  let fixture: ComponentFixture<FranchiseeDialogComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, InputNumberModule],
      declarations: [FranchiseeDialogComponent],
      providers: [
        FormBuilder,
        FranchiseeService,
        AddressService,
        LoadingService,
        MessageService,
        DynamicDialogRef,
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              mode: "UPDATE",
              franchisee: mockFranchisee,
              owner: mockUser1,
              address: mockAddress,
              schedule: mockSchedule,
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeDialogComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/contractors`);
    expect(req.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req.flush(mockFranchiseeArray);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should HAVE franchisee", () => {
    expect(component.franchisee).toBeTruthy();
  });

  it("submit franchisee for update", () => {
    expect(component.form.valid).toBeTruthy();

    // Trigger the func
    (component as any).getFormValues();

    (component as any).onSubmit();

    const req1 = httpTestingController.expectOne(`${environment.apiBaseUrl}/addresses/1`);
    expect(req1.request.method).toEqual(_HttpRequest.PUT);

    req1.flush({ message: Message.UPDATE });

    const req2 = httpTestingController.expectOne(`${environment.apiBaseUrl}/contractors`);
    expect(req2.request.method).toEqual(_HttpRequest.PUT);

    req2.flush({ message: Message.UPDATE });
  });

  it("should close", () => {
    component.onClose();
    expect(component).toBeTruthy();
  });
});
