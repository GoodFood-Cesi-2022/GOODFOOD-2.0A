import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { FranchiseeComponent } from './franchisee.component';
import { environment } from 'src/environments/environment';

fdescribe('FranchiseeComponent', () => {
  let component: FranchiseeComponent;
  let fixture: ComponentFixture<FranchiseeComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ConfirmationService],
      declarations: [FranchiseeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    const req = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/contractors`
    );
    expect(req.request.method).toEqual('GET');
    req.flush({});
    expect(component).toBeTruthy();
  });
});
