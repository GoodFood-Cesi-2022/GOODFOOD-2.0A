import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

import { LoadingComponent } from './loading.component';

const routerEventsSubject = new Subject<RouterEvent>();

const routerStub = {
  events: routerEventsSubject.asObservable(),
};

fdescribe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should correctly render the passed @Input value', () => {
  //   component.routing = true; // 1
  //   fixture.detectChanges(); // 2
  //   const compiled = fixture.debugElement.nativeElement; // 2
  //   expect(compiled.querySelector('div').textContent).toBe(true); // 3
  // });
});
