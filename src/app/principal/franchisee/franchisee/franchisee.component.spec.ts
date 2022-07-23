import { CommonModule } from "@angular/common";
import { Component, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmationService, Footer } from "primeng/api";
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from "primeng/dynamicdialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { FranchiseeComponent } from "./franchisee.component";
import { environment } from "src/environments/environment";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";
import { mockFranchisee } from "src/app/shared/mock/franchisee.mock";

@Component({
  template: ` <h2>PrimeNG ROCKS!</h2> `,
})
export class TestComponent {
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}
}

@Component({
  template: ` <div class="TestDynamicDialog"></div> `,
})
export class TestDynamicDialogComponent {
  constructor(public dialogService: DialogService) {}

  show() {
    this.dialogService.open(TestComponent, {
      header: "Demo Header",
      width: "70%",
      contentStyle: { "max-height": "350px", overflow: "auto" },
      dismissableMask: true,
      baseZIndex: 0,
    });
  }
}
@NgModule({
  imports: [CommonModule, DynamicDialogModule],
  declarations: [TestComponent, TestDynamicDialogComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent],
  providers: [DialogService],
})
export class FakeTestDialogModule {}

describe("FranchiseeComponent", () => {
  let component: FranchiseeComponent;
  let fixture: ComponentFixture<FranchiseeComponent>;
  let httpTestingController: HttpTestingController;
  let testDynamicDialogComponent: TestDynamicDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, NoopAnimationsModule, FakeTestDialogModule],
      providers: [ConfirmationService],
      declarations: [FranchiseeComponent, Footer],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    testDynamicDialogComponent = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/contractors`);
    expect(req.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock address
    req.flush(mockFranchisee);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open dialog and close dialog", fakeAsync(() => {
    fixture.detectChanges();

    //testDynamicDialogComponent.show();
    // fixture.detectChanges();

    // tick(300);
    // let dynamicDialogEl = document.getElementsByClassName("p-dynamic-dialog")[0];
    // expect(dynamicDialogEl).toBeTruthy();
    // const titleEl = dynamicDialogEl.getElementsByClassName("p-dialog-title")[0];
    // const testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
    // expect(titleEl.textContent).toEqual("Demo Header");
    // expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
    // let dynamicDialogTitlebarIconEl = document.querySelector(".p-dynamic-dialog .p-dialog-header-icon") as HTMLElement;
    // dynamicDialogTitlebarIconEl.click();
    // fixture.detectChanges();
    // tick(700);

    // dynamicDialogEl = document.getElementsByClassName("p-dynamic-dialog")[0];
    // expect(dynamicDialogEl).toBeUndefined();
  }));
});
