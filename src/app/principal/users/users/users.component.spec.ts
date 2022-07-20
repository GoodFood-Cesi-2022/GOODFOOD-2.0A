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
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'src/app/shared/constants/message.const';

fdescribe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [UsersComponent],
      providers: [MessageService, ConfirmationService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    component.initForm();
    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/users`
    );
    expect(req.request.method).toEqual(_HttpRequest.GET);
    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.form.controls['firstname'].setValue('');
    component.form.controls['lastname'].setValue('');
    component.form.controls['phone'].setValue('');
    component.form.controls['email'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('firstname field validity', () => {
    let error = {};
    let firstname = component.form.controls['firstname'];
    expect(firstname.valid).toBeFalsy();

    // firstname is required
    error = firstname.errors || {};
    expect(error['required']).toBeTruthy();

    // set firstname
    firstname.setValue('Sara');
    error = firstname.errors || {};
    expect(error['required']).toBeFalsy();
  });

  it('lastname field validity', () => {
    let error = {};
    let lastname = component.form.controls['lastname'];
    expect(lastname.valid).toBeFalsy();

    // lastname is required
    error = lastname.errors || {};
    expect(error['required']).toBeTruthy();

    // set lastname
    lastname.setValue('Dubois');
    error = lastname.errors || {};
    expect(error['required']).toBeFalsy();
  });

  it('phone field validity', () => {
    let error = {};
    let phone = component.form.controls['phone'];
    expect(phone.valid).toBeFalsy();

    // phone is required and has pattern
    error = phone.errors || {};
    expect(error['required']).toBeTruthy();

    // set phone
    phone.setValue('0122112211');
    error = phone.errors || {};
    expect(error['required']).toBeFalsy();
  });

  it('email field validity', () => {
    let error = {};
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    error = email.errors || {};
    expect(error['required']).toBeTruthy();

    email.setValue('test@test.com');
    error = email.errors || {};
    expect(error['pattern']).toBeFalsy();
  });

  it('should intiailize user Value at default value', () => {
    // Trigger the func
    (component as any).newUser();
    expect(component.user).toEqual({});
  });

  it('should getFormValues() for creation', () => {
    expect(component.form.valid).toBeFalsy();
    component.isCreate = true;
    component.form.controls['firstname'].setValue('Sara');
    component.form.controls['lastname'].setValue('Dubois');
    component.form.controls['phone'].setValue('0122112211');
    component.form.controls['email'].setValue('test@test.com');
    expect(component.form.valid).toBeTruthy();

    // Trigger the func
    (component as any).getFormValues();

    expect(component.user.firstname).toBe('Sara');
    expect(component.user.lastname).toBe('Dubois');
    expect(component.user.phone).toBe('0122112211');
    expect(component.user.email).toBe('test@test.com');
  });

  it('should getFormValues() for Modification', () => {
    expect(component.form.valid).toBeFalsy();
    component.isCreate = false;
    component.user.id = 1;
    component.form.controls['firstname'].setValue('Sara');
    component.form.controls['lastname'].setValue('Dubois');
    component.form.controls['phone'].setValue('0122112211');
    component.form.controls['email'].setValue('test@test.com');
    expect(component.form.valid).toBeTruthy();

    // Trigger the func
    (component as any).getFormValues();

    expect(component.user.firstname).toBe('Sara');
    expect(component.user.lastname).toBe('Dubois');
    expect(component.user.phone).toBe('0122112211');
    expect(component.user.email).toBe('test@test.com');
  });

  it('submit user creation', () => {
    expect(component.form.valid).toBeFalsy();
    component.isCreate = true;
    component.form.controls['firstname'].setValue('Sara');
    component.form.controls['lastname'].setValue('Dubois');
    component.form.controls['phone'].setValue('0122112211');
    component.form.controls['email'].setValue('test@test.com');
    expect(component.form.valid).toBeTruthy();

    component.isCreate = false;
    component.user.id = 1;
    component.form.controls['firstname'].setValue('Sara');
    component.form.controls['lastname'].setValue('Dubois');
    component.form.controls['phone'].setValue('0122112211');
    component.form.controls['email'].setValue('test@test.com');
    expect(component.form.valid).toBeTruthy();

    // Trigger the func
    (component as any).onSubmit();

    expect(component.user).toEqual({});

    const req = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/users`
    );
    expect(req.request.method).toEqual(_HttpRequest.POST);

    // Respond with the mock ingredient-types
    req.flush({ message: Message.UPDATE });
  });

  it('delete user', () => {
    const mockConfirm: any = spyOn(
      ConfirmationService.prototype,
      'confirm'
    ).and.callFake((c: any) => {
      return c.accept();
    });
    component.user = {};
    component.user.id = 1;

    // Trigger the func
    (component as any).onDelete(component.user);
    expect(mockConfirm).toBeTruthy();
    expect(mockConfirm).toHaveBeenCalled();

    const req = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/users/1`
    );
    expect(req.request.method).toEqual(_HttpRequest.DELETE);

    // Respond with the mock user
    req.flush({ message: Message.DELETE });
  });

  it('description field validity', () => {
    component.hideDialog();
    expect(component).toBeTruthy();
  });
});
