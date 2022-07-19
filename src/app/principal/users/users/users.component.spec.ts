import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UsersComponent } from './users.component';
import { environment } from 'src/environments/environment';
import { _HttpRequest } from 'src/app/shared/constants/httpRequest.const';

fdescribe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [UsersComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    const req = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/users`
    );
    expect(req.request.method).toEqual(_HttpRequest.GET);
    req.flush({});
    expect(component).toBeTruthy();
  });

  describe('Component: getFormValues()', () => {
    beforeEach(() => {
      (component as any).get
    });
    it('form invalid when empty', () => {
      expect(component.form.valid).toBeFalsy();
    });
  });
});
