import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RecipeDialogComponent } from "./recipe-dialog.component";
import { MessageService } from "primeng/api";
import { environment } from "src/environments/environment";
import { _HttpRequest } from "src/app/shared/constants/httpRequest.const";
import { mockRecipe1 } from "src/app/shared/mock/recipe.mock";
import { mockIngredientArray } from "src/app/shared/mock/ingredients.mock";
import { mockRecipeTypeArray, recipeType1 } from "src/app/shared/mock/recipe-type.mock";
import { mockTypeArray } from "src/app/shared/mock/ingredient-type.mock";
import { picture1 } from "src/app/shared/mock/picture.mock";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { CalendarModule } from "primeng/calendar";
import { InputNumberModule } from "primeng/inputnumber";
import { CheckboxModule } from "primeng/checkbox";

describe("RecipeDialogComponent", () => {
  let component: RecipeDialogComponent;
  let fixture: ComponentFixture<RecipeDialogComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        InputNumberModule,
        DropdownModule,
        MultiSelectModule,
        CalendarModule,
        CheckboxModule,
      ],
      declarations: [RecipeDialogComponent],
      providers: [
        DynamicDialogRef,
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              mode: "CREATE",
              recipe: mockRecipe1,
              ingredients: mockIngredientArray,
              recipeType: recipeType1,
              ingredientsType: mockTypeArray,
              picture: picture1,
            },
          },
        },
        MessageService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDialogComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req1 = httpTestingController.expectOne(`${environment.apiBaseUrl}/recipes/types`);
    expect(req1.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req1.flush(mockRecipeTypeArray);

    const req2 = httpTestingController.expectOne(`${environment.apiBaseUrl}/ingredients`);
    expect(req1.request.method).toEqual(_HttpRequest.GET);

    // Respond with the mock ingredient-types
    req2.flush(mockIngredientArray);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
