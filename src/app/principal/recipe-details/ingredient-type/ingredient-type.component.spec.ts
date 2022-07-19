import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { IngredientTypeComponent } from './ingredient-type.component';
import { environment } from 'src/environments/environment';
import { mockTypeArray } from 'src/app/shared/mock/ingredient-type.mock';
import { _HttpRequest } from 'src/app/shared/constants/httpRequest.const';
import { IngreType } from 'src/app/shared/models/ingredient-type.model';

fdescribe('IngredientTypeComponent', () => {
  let component: IngredientTypeComponent;
  let fixture: ComponentFixture<IngredientTypeComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [IngredientTypeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientTypeComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    component.initForm();

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    const req2 = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/ingredients/types`
    );
    expect(req2.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req2.flush(mockTypeArray);
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

  it('should makeIngredientType()', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['name'].setValue('fruits');
    component.form.controls['description'].setValue('description is a test!');
    expect(component.form.valid).toBeTruthy();

    let ingreType: IngreType;

    // Trigger the func
    (component as any).makeIngredientType();

    expect(ingreType.name).toBe('fruits');
    expect(ingreType.description).toBe('description is a test!');
  });

  it('description field validity', () => {
    component.hideDialog();
    // expect().toBe(true);
  });
});
