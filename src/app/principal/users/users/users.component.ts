import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';

import { User } from 'src/app/shared/models/user.model';

import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userDialog: boolean;

  users: User[] = [];
  user: User;
  selectedUsers: User[];

  idFranchisee: number;
  submitted: boolean;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loading: LoadingService
  ) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.usersService
      .getAllFranchisees()
      .pipe(finalize(() => this.loading.loadingOff()))
      .subscribe((res) => {
        this.users = res;
        console.log('---> users --->', this.users);
      });
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

  openNew(): void {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: User): void {
    this.user = { ...user };
    this.userDialog = true;
  }

  delete(user: User): void {
    this.confirmationService.confirm({
      message:
        'Etes-vous sûre de vouloir supprimer' +
        ' "' +
        user.firstname +
        ' ' +
        user.lastname +
        '" ' +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: (): void => {
        this.usersService.removeFranchisee(user.id).subscribe({
          next: () => {
            const index = this.users.indexOf(user);
            this.users.splice(index, 1);
            this.user = {};
            this.users = [...this.users];
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Franchisé est supprimé',
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur le moment de suppression',
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

  saveUser() {
    this.submitted = true;

    if (this.user.email.trim()) {
      if (this.user.id) {
        this.usersService.updateFranchisee(this.user);
        this.users[this.findIndexById(this.user.id)] = this.user;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: "Mise à jour d'utilisateur.",
          life: 3000,
        });
      } else {
        this.usersService.newFranchisee(this.user);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Création de nouvel utilisateur.',
          life: 3000,
        });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): number {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }
}
