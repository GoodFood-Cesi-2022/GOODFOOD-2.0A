import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RecipeDialogComponent } from './recipe-dialog.component';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { _HttpRequest } from 'src/app/shared/constants/httpRequest.const';
import { mockRecipeArray } from 'src/app/shared/mock/recipe.mock';

fdescribe('RecipeDialogComponent', () => {
  let component: RecipeDialogComponent;
  let fixture: ComponentFixture<RecipeDialogComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [RecipeDialogComponent],
      providers: [DynamicDialogRef, DynamicDialogConfig, MessageService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDialogComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req2 = httpTestingController.expectOne(
      `${environment.apiBaseUrl}/recipes?includes[]=pictures`
    );
    expect(req2.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req2.flush(mockRecipeArray);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
