import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Address } from 'src/app/shared/models/address.model';

import { Franchisee } from 'src/app/shared/models/franchisee.model';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';

@Component({
  selector: 'app-franchisee-detail',
  templateUrl: './franchisee-detail.component.html',
  styleUrls: ['./franchisee-detail.component.scss'],
})
export class FranchiseeDetailComponent implements OnInit {
  franchisees: Franchisee[] = [];
  franchisee: Franchisee;
  address: Address;
  schedule: Schedule;

  form: FormGroup;
  editMode: boolean;

  constructor(
    private franchiseeService: FranchiseeService,
    public messageService: MessageService,
    private loading: LoadingService,
    private fb: FormBuilder
  ) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.franchiseeService.getFranchisees().subscribe((res) => {
      this.franchisees = res;
      console.log('franchisee component --> get all franchisees --> ', res);
    });
    this.initFranchisee();
  }

  initFranchisee(): void {
    this.form = this.fb.group({
      name: [this.franchisee?.name || '', [Validators.required]],
      phone: [this.franchisee?.phone || '', [Validators.required]],
      email: [
        this.franchisee?.email || '',
        [Validators.required, Validators.email],
      ],
      max_delivery_radius: [
        this.franchisee?.max_delivery_radius,
        [Validators.required],
      ],
      address: [this.franchisee?.address, [Validators.required]],
      first_line: [this.franchisee?.address?.first_line, [Validators.required]],
      second_line: [this.franchisee?.address?.second_line || ''],
      zip_code: [
        this.franchisee?.address?.zip_code || '',
        [Validators.required],
      ],
      city: [this.franchisee?.address?.city || '', [Validators.required]],
      country: [this.franchisee?.address?.country || '', [Validators.required]],
    });
  }

  private getFranchisee(): void {
    this.franchisee.name = this.form.value.name;
    this.franchisee.phone = this.form.value.phone;
    this.franchisee.email = this.form.value.email;
    this.franchisee.max_delivery_radius = this.form.value.max_delivery_radius;
    this.franchisee.address.first_line = this.form.value.first_line;
    this.franchisee.address.second_line = this.form.value.second_line;
    this.franchisee.address.zip_code = this.form.value.zip_code;
    this.franchisee.address.city = this.form.value.city;
    this.franchisee.address.country = this.form.value.country;
    if (this.editMode) {
      this.address = this.franchisee.address;
      this.address.id = this.franchisee.address_id;
    }
  }
  public onSubmit(): void {
    this.getFranchisee();
    this.loading.loadingOn();

    if (this.editMode) {
      this.updateFranchisee();
    } else {
      this.newFranchisee();
    }
  }

  newFranchisee(): void {
    //NOSONAR
  }

  updateFranchisee(): void {
    //NOSONAR
  }

  newSchedule(): void {
    //NOSONAR
  }
}
