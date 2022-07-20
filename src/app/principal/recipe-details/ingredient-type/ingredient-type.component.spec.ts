import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { IngredientTypeComponent } from './ingredient-type.component';
import { environment } from 'src/environments/environment';
import { mockTypeArray } from 'src/app/shared/mock/ingredient-type.mock';
import { _HttpRequest } from 'src/app/shared/constants/httpRequest.const';
import { IngreType } from 'src/app/shared/models/ingredient-type.model';
import { Message } from 'src/app/shared/constants/message.const';

fdescribe('IngredientTypeComponent', () => {
  let component: IngredientTypeComponent;
  let fixture: ComponentFixture<IngredientTypeComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [IngredientTypeComponent],
      providers: [MessageService, ConfirmationService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientTypeComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    component.initForm();
    fixture.detectChanges();

    const req2 = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/ingredients/types`
    );
    expect(req2.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req2.flush(mockTypeArray);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let error = {};
    let name = component.form.controls['name'];
    expect(name.valid).toBeFalsy();

    // name is required
    error = name.errors || {};
    expect(error['required']).toBeTruthy();

    // set name
    name.setValue('meat');
    error = name.errors || {};
    expect(error['required']).toBeFalsy();
  });

  it('description field validity', () => {
    let error = {};
    let description = component.form.controls['description'];
    description.setValue('description');

    expect(description.valid).toBeTruthy();

    // description is NOT required
    error = description.errors || {};
    expect(error['required']).toBeFalsy();
  });

  it('should intiailize ingreType Value at default value', () => {
    // Trigger the func
    (component as any).newIngredientType();
    expect(component.ingreType).toEqual({});
  });

  it('should intiailize ingreType Value with ingreType parameters', () => {
    let ingreType: IngreType = {};
    ingreType.name = 'fruits';
    ingreType.description = 'description is a test!';
    // Trigger the func
    (component as any).updateIngredientType(ingreType);

    expect(component.ingreType.name).toBe('fruits');
    expect(component.ingreType.description).toBe('description is a test!');
  });

  it('should makeIngredientType()', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['name'].setValue('fruits');
    component.form.controls['description'].setValue('description is a test!');
    expect(component.form.valid).toBeTruthy();

    // Trigger the func
    (component as any).makeIngredientType();

    expect(component.ingreType.name).toBe('fruits');
    expect(component.ingreType.description).toBe('description is a test!');
  });

  it('submit ingredient type for creation', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['name'].setValue('fruits');
    component.form.controls['description'].setValue('description is a test!');
    expect(component.form.valid).toBeTruthy();

    // Trigger the func
    component.onSubmit();

    expect(component.ingreType).toEqual({});

    const req = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/ingredients/types`
    );
    expect(req.request.method).toEqual(_HttpRequest.POST);

    // Respond with the mock ingredient-types
    req.flush({ message: Message.UPDATE_SUCCESS });
  });

  it('delete ingredient type', () => {
    const mockConfirm: any = spyOn(
      ConfirmationService.prototype,
      'confirm'
    ).and.callFake((c: any) => {
      return c.accept();
    });
    component.ingreType = {};

    component.ingreType.id = 1;
    // Trigger the func
    (component as any).deleteIngredientType(component.ingreType);
    expect(mockConfirm).toBeTruthy();
    expect(mockConfirm).toHaveBeenCalled();

    const req = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/ingredients/types/1`
    );
    expect(req.request.method).toEqual(_HttpRequest.DELETE);

    // Respond with the mock ingredient-types
    req.flush({ message: Message.DELETE });
  });

  it('description field validity', () => {
    component.hideDialog();
    expect(component).toBeTruthy();
  });
});
