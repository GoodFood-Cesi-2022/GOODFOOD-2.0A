import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeDetailComponent } from './franchisee-detail.component';

describe('FranchiseeDetailComponent', () => {
  let component: FranchiseeDetailComponent;
  let fixture: ComponentFixture<FranchiseeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
