import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Franchisee } from 'src/app/shared/models/franchisee.model';
import { Address } from 'src/app/shared/models/address.model';
import { Schedule } from './../../../shared/models/schedule.model';
import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FranchiseeDialogComponent } from '../franchisee-dialog/franchisee-dialog.component';
@Component({
  selector: 'app-franchisee',
  templateUrl: './franchisee.component.html',
  styleUrls: ['./franchisee.component.scss'],
  providers: [DialogService, MessageService],
  styles: [
    `
      :host ::ng-deep .p-button {
        margin: 0 0.5rem 0 0;
        min-width: 10rem;
      }
      p {
        margin: 0;
      }
      .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host ::ng-deep .p-dialog .p-button {
        min-width: 6rem;
      }
    `,
  ],
})
export class FranchiseeComponent implements OnInit {
  // form: FormGroup;
  ref: DynamicDialogRef;

  franchisees: Franchisee[] = [];
  // franchisee: Franchisee;
  selectedFranchisee: Franchisee[] = [];
  address: Address;
  schedule: Schedule;

  contactDialog: boolean;
  scheduleDialog: boolean;

  sortOrder: number;
  sortField: string;

  isCreate: boolean;
  editMode: boolean;

  // submitted: boolean;
  first: number = 0;
  id: number;

  constructor(
    private franchiseeService: FranchiseeService,
    private addressService: AddressService,
    private scheduleService: ScheduleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private loading: LoadingService
  ) {
    // NOSONAR
  }

  ngOnInit(): void {
    /* retrieve franchisees */
    this.loading.loadingOn();
    this.franchiseeService
      .getFranchisees()
      .pipe(finalize((): void => this.loading.loadingOff()))
      .subscribe((res: Franchisee[]): void => {
        this.franchisees = res;
        console.log('---> franchisee component --> get franchisee --> ', res);
      });
  }

  onSortChange(event) {
    let value = (event.target as HTMLTextAreaElement).value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onChangeValue(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  create(): void {
    const ref = this.dialogService.open(FranchiseeDialogComponent, {
      header: 'Ajouter un nouveau franchisé',
      width: '70%',
      styleClass: 'DynamicDialog',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        mode: 'CREATE',
        franchisee: [],
        address: {},
        schedule: {},
      },
    });
    ref.onClose.subscribe((franchisee: Franchisee) => {
      if (franchisee) {
        this.franchisees = [...this.franchisees];
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Le franchisé est bien crée.',
        });
      }
    });
  }

  update(franchisee: Franchisee): void {
    this.ref = this.dialogService.open(FranchiseeDialogComponent, {
      header: `${franchisee.name}`,
      width: '70%',
      styleClass: 'DynamicDialog',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      data: {
        mode: 'UPDATE',
        schedule: this.schedule,
        address: this.address,
        franchisee,
      },
    });
    this.ref.onClose.subscribe((_franchisee: Franchisee): void => {
      if (_franchisee) {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Le franchisé est bien modifié.',
        });
      }
    });
  }

  /**
   * @params id franchisee
   * Delete a franchisee
   */
  delete(franchisee: Franchisee): void {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer le franchisé "${franchisee.name}" ?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'accept',
      accept: (): void => {
        this.franchiseeService.deleteFranchisee(franchisee.id).subscribe({
          next: (): void => {
            this.franchisees = [...this.franchisees];
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Ce franchisé est supprimé.',
              life: 3000,
            });
          },
          error: (error: any): void => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur le moment de csuppression du franchisé',
              detail: error.error,
            });
            console.log(
              'erreur le moment de suppression du franchisé : ',
              error
            );
          },
        });
      },
    });
  }

  // onSubmit(): void {
  //   this.submitted = true;
  // this.getFormValues();

  // if(this.franchisee.id) {
  //   this.franchiseeService.
  // }
  // }

  // onDelete(franchisee: Franchisee): void {
  //   this.confirmationService.confirm({
  //     message:
  //       ' Etes - vous sûre de vouloir supprimer "' +
  //       franchisee.name +
  //       ' ' +
  //       this.address.first_line +
  //       this.address.second_line +
  //       this.address.zip_code +
  //       this.address.city +
  //       this.address.country +
  //       '" ? ',
  //     header: ' Confirm ',
  //     icon: ' pi pi - exclamation - triangle ',
  //     acceptButtonStyleClass: ' accept ',
  //     accept: (): void => {
  //       this.franchiseeService.deleteFranchisee(franchisee.id).subscribe({
  //         next: () => {
  //           TODO check line 181 and verify if it does work in INGREDIENT, INGREDIENT_TYPE also
  //           this.franchisee = {};
  //           this.franchisees = [...this.franchisees];
  //           this.messageService.add({
  //             severity: ' success ',
  //             summary: ' Succès ',
  //             detail: ' Utilisateur est supprimé.',
  //             life: 3000,
  //           });
  //         },
  //         error: (error) => {
  //           this.messageService.add({
  //             severity: ' error ',
  //             summary: ' Erreur le moment de suppression ! ',
  //             detail: error.error,
  //           });
  //           console.log(
  //             "erreur le moment de création de l' ingrédient->",
  //             error
  //           );
  //         },
  //       });
  //     },
  //   });
  // }

  // initSchedule(): void {
  //  TODO code here
  // }

  // newSchedule() {
  // this.schedule={};
  //   this.submitted = false;
  //   this.scheduleDialog = true;
  // }

  // hideDialog(): void {
  //   this.contactDialog = false;
  //   this.submitted = false;
  // }
  // initForm(): void {
  //   this.form = this.fb.group({
  //     name: [this.franchisee?.name || '', [Validators.required]],
  //     phone: [
  //       this.franchisee?.phone || '',
  //       [Validators.required, Validators.pattern('/^[0][0-9]{9}$')],
  //     ],
  //     email: [
  //       this.franchisee?.email || '',
  //       [Validators.required, Validators.email],
  //     ],
  //     max_delivery_radius: [
  //       this.franchisee?.max_delivery_radius,
  //       [Validators.required],
  //     ],
  //     address_first_line: [
  //       this.franchisee?.address.first_line || '',
  //       [Validators.required],
  //     ],
  //     address_second_line: [this.franchisee?.address.second_line || ''],
  //     address_zip_code: [
  //       this.franchisee?.address.zip_code || '',
  //       [Validators.required],
  //     ],
  //     address_city: [
  //       this.franchisee?.address.city || '',
  //       [Validators.required],
  //     ],
  //     address_country: [
  //       this.franchisee?.address.country || '',
  //       [Validators.required],
  //     ],
  //   });
  // }

  // private getFormValues(): void {
  //   const franchisee: Franchisee = {};
  //   const address: Address = {};

  //   if (this.isCreate) {
  //     franchisee.name = this.form.get(' name ').value;
  //     franchisee.phone = this.form.get(' phone ').value;
  //     franchisee.email = this.form.get(' email ').value;
  //     franchisee.max_delivery_radius = this.form.get(
  //       ' max_delivery_radius '
  //     ).value;
  //     address.first_line = this.form.get(' address_first_line ').value;
  //     address.second_line = this.form.get(' address_second_line ').value;
  //     address.zip_code = this.form.get(' address_zip_code ').value;
  //     address.city = this.form.get(' address_city ').value;
  //     address.country = this.form.get(' address_country ').value;
  //   } else {
  //     franchisee.id = this.franchisee.id;
  //     franchisee.name = this.form.get(' name ').value;
  //     franchisee.phone = this.form.get(' phone ').value;
  //     franchisee.email = this.form.get(' email ').value;
  //     franchisee.max_delivery_radius = this.form.get(
  //       ' max_delivery_radius '
  //     ).value;
  //     address.id = this.address.id;
  //     address.first_line = this.form.get(' address_first_line ').value;
  //     address.second_line = this.form.get(' address_second_line ').value;
  //     address.zip_code = this.form.get(' address_zip_code ').value;
  //     address.city = this.form.get(' address_city ').value;
  //     address.country = this.form.get(' address_country ').value;
  //   }
  //   this.franchisee = franchisee;
  //   this.address = address;
  // }

  // newFranchisee(): void {
  //   this.franchisee = {};
  //   this.address = {};
  //   this.isCreate = true;
  //   this.initForm();
  //   this.submitted = false;
  //   this.contactDialog = true;
  // }

  // updateFranchisee(franchisee: Franchisee): void {
  //   this.franchisee = { ...franchisee };
  //   this.isCreate = false;
  //   this.initForm();
  //   this.submitted = false;
  //   this.contactDialog = true;
  // }
  // init(): void {
  //   /* retrieve franchisees */
  //   this.loading.loadingOn();
  //   this.franchiseeService
  //     .getFranchisees()
  //     .pipe(finalize((): void => this.loading.loadingOff()))
  //     .subscribe((res: Franchisee[]): void => {
  //       this.franchisees = res;
  //       console.log('---> franchisee component --> get franchisee --> ', res);
  //     });
  // }
}
