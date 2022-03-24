import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeComponent } from './franchisee.component';

describe('FranchiseeComponent', () => {
  let component: FranchiseeComponent;
  let fixture: ComponentFixture<FranchiseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
