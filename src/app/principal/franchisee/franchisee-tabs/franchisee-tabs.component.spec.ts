import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeTabsComponent } from './franchisee-tabs.component';

describe('FranchiseeTabsComponent', () => {
  let component: FranchiseeTabsComponent;
  let fixture: ComponentFixture<FranchiseeTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchiseeTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
