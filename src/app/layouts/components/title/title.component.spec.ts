import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';

fdescribe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;

    component.title = 'title';
    component.description = 'description';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // @Input title
  it('should contain "title"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('h4')!;
    expect(p.textContent).toEqual('title');
    expect(p.title.match).toBeTruthy();
  });

  // @Input description
  it('should contain "description"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;
    expect(p.textContent).toEqual('description');
    expect(p.title.match).toBeTruthy();
  });
});
