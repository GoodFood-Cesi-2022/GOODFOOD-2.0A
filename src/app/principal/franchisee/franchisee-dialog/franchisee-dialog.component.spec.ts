import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';

import { FranchiseeDialogComponent } from './franchisee-dialog.component';

describe('FranchiseeDialogComponent', () => {
  let component: FranchiseeDialogComponent;
  let fixture: ComponentFixture<FranchiseeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FranchiseeDialogComponent],
      providers: [
        { provide: FormBuilder, useClass: FormGroup },
        { provide: FranchiseeService, useValue: FranchiseeService },
        { provide: AddressService, useValue: AddressService },
        { provide: LoadingService, useValue: LoadingService },
        { provide: MessageService, useValue: MessageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should HAVE franchisees', () => {
    expect(component.franchiseeArray.length)
      .withContext('should have all franchisees after service promise resolves')
      .toBeGreaterThan(0);
  });
});
