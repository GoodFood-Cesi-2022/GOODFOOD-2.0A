import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { finalize } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Franchisee } from 'src/app/shared/models/franchisee.model';
import { Address } from 'src/app/shared/models/address.model';
import { Schedule } from './../../../shared/models/schedule.model';
import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
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
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class FranchiseeComponent implements OnInit {
  // form: FormGroup;
  ref: DynamicDialogRef;

  franchisees: Franchisee[] = [];
  franchisee: Franchisee;

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
      .subscribe((res): void => {
        this.franchisees = res;
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

  createNewFranchisee(): void {
    const ref = this.dialogService.open(FranchiseeDialogComponent, {
      header: 'Ajouter un nouveau franchisé',
      width: '60%',
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
      width: '60%',
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
}
