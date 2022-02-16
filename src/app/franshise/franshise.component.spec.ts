import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranshiseComponent } from './franshise.component';

describe('FranshiseComponent', () => {
  let component: FranshiseComponent;
  let fixture: ComponentFixture<FranshiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranshiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranshiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
