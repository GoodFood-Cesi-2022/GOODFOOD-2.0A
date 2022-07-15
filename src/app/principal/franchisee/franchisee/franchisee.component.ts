import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Franchisee } from 'src/app/shared/models/franchisee.model';

import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { Address } from 'src/app/shared/models/address.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddressService } from 'src/app/shared/services/address/address.service';

@Component({
  selector: 'app-franchisee',
  templateUrl: './franchisee.component.html',
  styleUrls: ['./franchisee.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class FranchiseeComponent implements OnInit {
  form: FormGroup;

  contacts: Franchisee[] = [];
  contact: Franchisee;
  selectedFranchisee: Franchisee[] = [];

  contactAddress: Address;

  contactDialog: boolean;
  isCreate: boolean;
  editMode: boolean;
  submitted: boolean;

  first: number = 0;
  id: number;
  constructor(
    private franchiseeService: FranchiseeService,
    private addressService: AddressService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loading: LoadingService,
    private fb: FormBuilder
  ) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.init();
    this.initForm();
  }

  init(): void {
    /* retrieve franchisees */
    // this.loading.loadingOn();
    this.franchiseeService
      .getFranchisees()
      .pipe(finalize(() => this.loading.loadingOff()))
      .subscribe((res) => {
        this.contacts = res;
        console.log('---> franchisee component --> get contact --> ', res);
      });
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.contact?.name || '', [Validators.required]],
      phone: [
        this.contact?.phone || '',
        [Validators.required, Validators.pattern('/^[0][0-9]{9}$')],
      ],
      email: [
        this.contact?.email || '',
        [Validators.required, Validators.email],
      ],
      max_delivery_radius: [
        this.contact?.max_delivery_radius,
        [Validators.required],
      ],
      address_first_line: [
        this.contact?.address.first_line || '',
        [Validators.required],
      ],
      address_second_line: [this.contactAddress?.second_line || ''],
      address_zip_code: [
        this.contactAddress?.zip_code || '',
        [Validators.required],
      ],
      address_city: [this.contactAddress?.city || '', [Validators.required]],
      address_country: [
        this.contactAddress?.country || '',
        [Validators.required],
      ],
    });
  }

  private getFormValues(): void {
    const contact: Franchisee = {};
    const contactAddress: Address = {};

    if (this.isCreate) {
      contact.name = this.form.get('name').value;
      contact.phone = this.form.get('phone').value;
      contact.email = this.form.get('email').value;
      contactAddress.first_line = this.form.get('address_first_line').value;
      contactAddress.second_line = this.form.get('address_second_line').value;
      contactAddress.zip_code = this.form.get('address_zip_code').value;
      contactAddress.city = this.form.get('address_city').value;
      contactAddress.country = this.form.get('address_country').value;
    } else {
      contact.id = this.contact.id;
      contact.name = this.form.get('name').value;
      contact.phone = this.form.get('phone').value;
      contact.email = this.form.get('email').value;
      contactAddress.id = this.contactAddress.id;
      contactAddress.first_line = this.form.get('address_first_line').value;
      contactAddress.second_line = this.form.get('address_second_line').value;
      contactAddress.zip_code = this.form.get('address_zip_code').value;
      contactAddress.city = this.form.get('address_city').value;
      contactAddress.country = this.form.get('address_country').value;
    }
    this.contact = contact;
    this.contactAddress = contactAddress;
  }

  newContact(): void {
    this.contact = {};
    this.contactAddress = {};
    this.isCreate = true;
    this.initForm();
    this.submitted = false;
    this.contactDialog = true;
  }

  editContact(contact: Franchisee): void {
    this.contact = { ...contact };
    this.isCreate = false;
    this.initForm();
    this.submitted = false;
    this.contactDialog = true;
  }

  onSubmit() {
    this.submitted = true;
    this.getFormValues();
  }
  onDelete(contact: Franchisee): void {
    this.confirmationService.confirm({
      message:
        'Etes-vous sûre de vouloir supprimer "' +
        contact.name +
        ' ' +
        this.contactAddress.first_line +
        this.contactAddress.second_line +
        this.contactAddress.zip_code +
        this.contactAddress.city +
        this.contactAddress.country +
        '" ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'accept',
      accept: (): void => {
        this.franchiseeService.deleteFranchisee(contact.id).subscribe({
          next: () => {
            // TODO check line 181 and verify if it does work in INGREDIENT, INGREDIENT_TYPE also
            this.contact = {};
            this.contacts = [...this.contacts];
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Utilisateur est supprimé.',
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur le moment de suppression!',
              detail: error.error,
            });
            console.log(
              "erreur le moment de création de l'ingrédient ->",
              error
            );
          },
        });
      },
    });
  }

  hideDialog() {
    this.contactDialog = false;
    this.submitted = false;
  }
}
