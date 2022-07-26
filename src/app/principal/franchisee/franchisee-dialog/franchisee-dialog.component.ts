import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

import { Franchisee } from "src/app/shared/models/franchisee.model";
import { Address } from "src/app/shared/models/address.model";
import { Schedule } from "src/app/shared/models/schedule.model";
import { AddressService } from "src/app/shared/services/address/address.service";
import { LoadingService } from "src/app/shared/services/loading/loading.service";
import { FranchiseeService } from "src/app/shared/services/franchisee/franchisee.service";
import { User } from "src/app/shared/models/user.model";

@Component({
  selector: "app-franchisee-dialog",
  templateUrl: "./franchisee-dialog.component.html",
  styleUrls: ["./franchisee-dialog.component.scss"],
})
export class FranchiseeDialogComponent implements OnInit {
  mode: "UPDATE" | "CREATE";
  form: FormGroup;

  franchiseeArray: Franchisee[] = [];
  franchisee: Franchisee;

  address: Address;
  schedule: Schedule;

  submitted: boolean;
  owner: User;

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
    this.franchisee.address = this.address;
    this.schedule = config.data.schedule;
    this.owner = config.data.owner;
  }

  ngOnInit(): void {
    this.franchiseeService.getFranchisees().subscribe((data: Franchisee[]): void => {
      this.franchiseeArray = data;
    });
    if (this.mode == "CREATE") {
      this.franchisee = {};
      this.address = {};
      this.franchisee.address = this.address;
    }

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.franchisee?.name || "", [Validators.required]],
      phone: [this.franchisee?.phone || "", [Validators.required]],
      email: [this.franchisee?.email || "", [Validators.required, Validators.email]],
      radius: [this.franchisee?.max_delivery_radius || "", [Validators.required]],
      first_line: [this.franchisee?.address?.first_line || "", [Validators.required]],
      second_line: [this.franchisee?.address?.second_line || ""],
      zip_code: [this.franchisee?.address?.zip_code || "", [Validators.required]],
      city: [this.franchisee?.address?.city || "", [Validators.required]],
      country: [this.franchisee?.address?.country || "", [Validators.required]],
    });
  }

  private getFormValues(): void {
    this.franchisee.name = this.form.value.name;
    this.franchisee.phone = this.form.value.phone;
    this.franchisee.email = this.form.value.email;
    this.franchisee.max_delivery_radius = this.form.value.radius;
    this.franchisee.address.first_line = this.form.value.first_line;
    this.franchisee.address.second_line = this.form.value.second_line;
    this.franchisee.address.zip_code = this.form.value.zip_code;
    this.franchisee.address.city = this.form.value.city;
    this.franchisee.address.country = this.form.value.country;

    if (this.mode === "UPDATE") {
      this.address = this.franchisee.address;
      this.address.id = this.franchisee.address_id;
    }
  }

  public onSubmit(): void {
    this.getFormValues();
    this.loading.loadingOn();

    if (this.mode === "UPDATE") {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    this.addressService
      .createAddress(this.address)
      .pipe(finalize((): void => this.loading.loadingOff()))
      .subscribe((res): void => {
        this.address = res;
        this.franchisee.address_id = res.id;
        this.franchiseeService.newFranchisee(this.franchisee, this.owner.id).subscribe({
          next: (_res) => {
            this.ref.close(_res);
            this.franchisee = _res;
          },
          error: (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur le moment de création du franchisé.",
              detail: error.error,
            });
          },
        });
      });
  }

  private update(): void {
    this.addressService
      .updateAddress(this.address)
      .pipe(finalize((): void => this.loading.loadingOff()))
      .subscribe((): void => {
        this.franchiseeService.updateFranchisee(this.franchisee).subscribe({
          next: (res) => {
            this.ref.close(res);
          },
          error: (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur le moment de modification du franchisé.",
              detail: error.error,
            });
          },
        });
      });
  }

  public onClose(): void {
    this.ref.close();
  }
}
