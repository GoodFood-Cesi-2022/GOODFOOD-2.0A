import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientTypeComponent } from './ingredient-type.component';

describe('IngredientTypeComponent', () => {
  let component: IngredientTypeComponent;
  let fixture: ComponentFixture<IngredientTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
