import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Franchisee } from 'src/app/shared/models/franchisee.model';
import { Address } from 'src/app/shared/models/address.model';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';

@Component({
  selector: 'app-franchisee-dialog',
  templateUrl: './franchisee-dialog.component.html',
  styleUrls: ['./franchisee-dialog.component.scss'],
})
export class FranchiseeDialogComponent implements OnInit {
  mode: 'UPDATE' | 'CREATE';
  form: FormGroup;

  franchiseeArray: Franchisee[] = [];
  franchisee: Franchisee;

  address: Address;
  schedule: Schedule;

  submitted: boolean;
  isDisabledControlForm: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private messageService: MessageService,
    private loading: LoadingService,
    private franchiseeService: FranchiseeService,
    private addressService: AddressService
  ) {
    this.mode = config.data.mode;
    this.franchisee = config.data.franchisee;
    this.address = config.data.address;
    this.schedule = config.data.schedule;
  }

  ngOnInit(): void {
    this.franchiseeService
      .getFranchisees()
      .subscribe((data: Franchisee[]): void => {
        this.franchiseeArray = data;
        console.log('-----------> franchisee dialog --> ', data);
      });

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.franchisee?.name || '', [Validators.required]],
      phone: [
        this.franchisee?.phone || '',
        [Validators.required, Validators.pattern('/^[0][0-9]{9}$')],
      ],
      email: [
        this.franchisee?.email || '',
        [Validators.required, Validators.email],
      ],
      max_delivery_radius: [
        this.franchisee?.max_delivery_radius,
        [Validators.required],
      ],
      address_first_line: [
        this.franchisee?.address.first_line || '',
        [Validators.required],
      ],
      address_second_line: [this.franchisee?.address.second_line || ''],
      address_zip_code: [
        this.franchisee?.address.zip_code || '',
        [Validators.required],
      ],
      address_city: [
        this.franchisee?.address.city || '',
        [Validators.required],
      ],
      address_country: [
        this.franchisee?.address.country || '',
        [Validators.required],
      ],
    });
  }

  private getFormValues(): void {
    // const franchisee: Franchisee = {};
    // const address: Address = {};

    // if (this.mode === 'CREATE') {
    // this.franchisee.name = this.form.get(' name ').value;
    // this.franchisee.phone = this.form.get(' phone ').value;
    // this.franchisee.max_delivery_radius=this.form.value.max_delivery_radius;
    // this.franchisee.email = this.form.get(' email ').value;
    // this.address.first_line = this.form.get(' address_first_line ').value;
    // this.address.second_line = this.form.get(' address_second_line ').value;
    // this.address.zip_code = this.form.get(' address_zip_code ').value;
    // this.address.city = this.form.get(' address_city ').value;
    // this.address.country = this.form.get(' address_country ').value;
    // }
    // else {
    // this.franchisee.id = this.franchisee.id;
    this.franchisee.name = this.form.value.name;
    this.franchisee.phone = this.form.value.phone;
    this.franchisee.email = this.form.value.email;
    this.franchisee.max_delivery_radius = this.form.value.max_delivery_radius;
    // this.address.id = this.address.id;
    this.address.first_line = this.form.value.address_first_line;
    this.address.second_line = this.form.value.address_second_line;
    this.address.zip_code = this.form.value.address_zip_code;
    this.address.city = this.form.value.address_city;
    this.address.country = this.form.value.address_country;
    // }
    // this.franchisee = franchisee;
    // this.address = address;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.getFormValues();
      this.loading.loadingOn();

      if (this.mode === 'UPDATE') {
        this.update();
      } else {
        this.create();
      }
    }
  }

  private create(): void {
    this.franchiseeService
      .newFranchisee(this.franchisee)
      .pipe(finalize(() => this.loading.loadingOff()))
      .subscribe({
        next: (res) => {
          this.ref.close(res);
          // this.franchisee = res;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur le moment de création du franchisé.',
            detail: error.error,
          });
        },
      });
  }

  private update(): void {
    this.franchiseeService.updateFranchisee(this.franchisee).subscribe({
      next: (res) => {
        this.ref.close(res);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur le moment de modification du franchisé.',
          detail: error.error,
        });
      },
    });
  }

  public onClose(): void {
    this.ref.close();
  }

  public checkError(controlName: string, errorName: string): boolean {
    return (
      this.form.controls[controlName].dirty &&
      this.form.controls[controlName].hasError(errorName)
    );
  }
}
