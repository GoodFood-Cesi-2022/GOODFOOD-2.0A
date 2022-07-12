import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

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
        console.log('All users --->', this.users);
      });
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      firstname: [this.user?.firstname.trim() || '', [Validators.required]],
      lastname: [this.user?.lastname.trim() || '', [Validators.required]],
      phone: [
        this.user?.phone.trim() || '',
        [Validators.required, Validators.pattern('/^[0][0-9]{9}$')],
      ],
      email: [
        this.user?.email.trim() || '',
        [Validators.required, Validators.email],
      ],
    });
  }

  private getFormValues(): void {
    var user: User = {};

    if (this.isCreate) {
      user.firstname = this.form.get('firstname').value;
      user.lastname = this.form.get('lastname').value;
      user.phone = this.form.get('phone').value;
      user.email = this.form.get('email').value;
    } else {
      user.id = this.user.id;
      user.firstname = this.form.get('firstname').value;
      user.lastname = this.form.get('lastname').value;
      user.phone = this.form.get('phone').value;
      user.email = this.form.get('email').value;
    }
    this.user = user;
    console.log('---------------getFormValues -----------> ', this.user);
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

    if (this.user.email) {
      if (this.user.id) {
        this.usersService.updateUser(this.user).subscribe({
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
            console.log(error);
          },
        });
      }
    } else {
      this.usersService.newUser(this.user).subscribe({
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
            detail: error.error,
          });
        },
      });
    }
    this.users = [...this.users];
    this.userDialog = false;
    this.user = {};
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
            // TODO check line 181 and verify if it does work in INGREDIENT, INGREDIENT_TYPE also
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
    this.userDialog = false;
    this.submitted = false;
  }

  // private initFranchiseeAndRole(idFranchisee: number): void{
  //   forkJoin([
  //     this.usersService
  //       .getAllFranchisees(),
  //     this.usersService.getFranchiseeRole(this.idFranchisee)
  //   ]).subscribe((res) => {
  //     this.users = res[0];
  //     this.users.forEach(e=>e.roles) = res[1];
  //     console.log('---> users --->', this.users);
  //   });
  // }
  // findIndexById(id: number): number {
  //   let index = -1;
  //   for (let i = 0; i < this.users.length; i++) {
  //     if (this.users[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   return index;
  // }

  // createId(): number {
  //   return Math.floor(Math.random() * Math.floor(299) + 1);
  // }
}
