import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDialogComponent } from './ingredient-dialog.component';

describe('IngredientDialogComponent', () => {
  let component: IngredientDialogComponent;
  let fixture: ComponentFixture<IngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
