import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { RecipesComponent } from './recipes.component';
import { environment } from 'src/environments/environment';
import { _HttpRequest } from 'src/app/shared/constants/httpRequest.const';

fdescribe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ConfirmationService],
      declarations: [RecipesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    const req1 = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/recipes?includes[]=pictures`
    );
    expect(req1.request.method).toEqual(_HttpRequest.GET);
    req1.flush({});
    expect(component).toBeTruthy();
  });
});
