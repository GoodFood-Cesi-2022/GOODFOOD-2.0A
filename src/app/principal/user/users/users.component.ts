import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.model';

import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
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
export class UsersComponent implements OnInit {
  users: User[] = [];
  user: User;
  selectedUsers: User[];

  form: FormGroup;

  idFranchisee: number;
  submitted: boolean;
  userDialog: boolean;

  first: number = 0;

  id: number;
  isCreate: boolean;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loading: LoadingService,
    private fb: FormBuilder
  ) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.usersService
      .getUsers()
      .pipe(finalize(() => this.loading.loadingOff()))
      .subscribe((res) => {
        this.users = res;
        // this.users.forEach((e) => e.roles);
      });
    // this.usersService.getUserRole(this.id).subscribe((role) => this.users.forEach((e) => e.roles));

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      firstname: [this.user?.firstname, [Validators.required]],
      lastname: [this.user?.lastname, [Validators.required]],
      phone: [
        this.user?.phone,
        [Validators.required, Validators.pattern('/^[0][0-9]{9}$')],
      ],
      email: [this.user?.email, [Validators.required, Validators.email]],
      role: [this.user?.roles, [Validators.required]],
    });
  }

  private getFormValues(): void {
    const user: User = {};

    user.firstname = this.form.get('firstname').value;
    user.lastname = this.form.get('lastname').value;
    user.phone = this.form.get('phone').value;
    user.email = this.form.get('email').value;
    user.roles = [this.form.controls['role'].value.code];

    if (!this.isCreate) {
      user.id = this.user.id;
    }

    this.user = user;
  }

  newUser(): void {
    this.user = {};
    this.isCreate = true;
    this.initForm();
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: User): void {
    this.user = { ...user };
    this.isCreate = false;
    this.initForm();
    this.submitted = false;
    this.userDialog = true;
  }

  onSubmit() {
    this.submitted = true;
    this.getFormValues();
    this.loading.loadingOn();

    if (this.user.id) {
      this.updateUser();
    } else {
      this.createNewUser();
    }
    this.users = [...this.users];
    this.userDialog = false;
    this.user = {};
  }

  private createNewUser(): void {
    this.usersService
      .newUser(this.user)
      .pipe(finalize((): void => this.loading.loadingOff()))
      .subscribe((res): void => {
        this.user = res;
        this.usersService.AddRole(this.user).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Création de nouvel utilisateur.',
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur le moment de création!',
              detail: error.error.Message,
            });
          },
        });
      });
  }

  private updateUser(): void {
    this.usersService
      .updateUser(this.user)
      .pipe(finalize((): void => this.loading.loadingOff()))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: "Mise à jour d'utilisateur.",
            life: 3000,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary:
              "Erreur le moment de modification des informations d'utilisateur!",
            detail: error.error,
          });
        },
      });
  }

  onDelete(user: User): void {
    this.confirmationService.confirm({
      message:
        'Etes-vous sûre de vouloir supprimer "' +
        user.firstname +
        ' ' +
        user.lastname +
        '" ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'accept',
      accept: (): void => {
        this.usersService.deleteUser(user.id).subscribe({
          next: () => {
            this.user = {};
            this.users = [...this.users];
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
          },
        });
      },
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
}
