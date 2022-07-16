import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeDialogComponent } from './franchisee-dialog.component';

describe('FranchiseeDialogComponent', () => {
  let component: FranchiseeDialogComponent;
  let fixture: ComponentFixture<FranchiseeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
