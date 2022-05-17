import { Component, Input, OnInit } from '@angular/core';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory,
} from '@ngrx/data';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { selectUserDetails } from 'src/app/shared/store/state/user';

declare var window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [MessageService],
  styleUrls: ['./profile.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-cell-editing {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;

  user$ = this.store.select(selectUserDetails);

  // public profile$!: Observable<User>;

  // _user!: null;

  constructor(private store: Store) {
    // this.profile$ = this.store.pipe(select(profileSeletor));
    // this.profile$.subscribe((res: any) => {
    //   if (res) {
    //     this._user = res['model'];
    //   }
    // });
  }

  ngOnInit() {}
  // user$!: Observable<User[]>;

  // clonedUser: { [s: string]: User } = {};

  // userService: EntityCollectionService<User>;

  // _modal: any;

  // userForm: User = {
  //   id: 0,
  //   firstname: '',
  //   lastname: '',
  //   phone: '',
  //   email: '',
  //   address1: '',
  //   address2: '',
  //   zip: 0,
  //   password: '',
  //   city: '',
  //   country: '',
  // };
  // modalTitle: string = '';

  // constructor(
  //   private entityCollectionServiceFactory: EntityCollectionServiceFactory // , // private messageService: MessageService, // private userService: UserService
  // ) {
  //   this.userService = entityCollectionServiceFactory.create<User>('User');
  //   this.user$ = this.userService.entities$;
  // }

  // ngOnInit(): void {
  // this.userService.getUserSmall().then((data) => (this.user$ = data));

  //this.userService['getUser']();
  // this.userService.getUserSmall().then((data) => (this.user$ = data));
  //this.userService['getUser']();
  //   this.userService.getAll();
  //   this._modal = new window.bootstrap.Modal(document.getElementById('user'), {
  //     keyboard: false,
  //   });
  // }

  // onRowEditInit(user: User) {
  //   this.clonedUser[user.id] = { ...user };
  // }

  // onRowEditSave(user: User) {
  //   if (user.id > 0) {
  //     delete this.clonedUser[user.id];
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Success',
  //       detail: 'Product is updated',
  //     });
  //   } else {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Invalid Price',
  //     });
  //   }
  // }

  // onRowEditCancel(product: Product, index: number) {
  //   this.products2[index] = this.clonedProducts[product.id];
  //   delete this.products2[product.id];
  // }

  // openModal(userId: number) {
  //   if (userId == 0) {
  //     this.modalTitle = 'Edit user';
  //     this.userForm = {
  //       firstname: '',
  //       lastname: '',
  //       phone: '',
  //       email: '',
  //       address1: '',
  //       address2: '',
  //       zip: 0,
  //       id: 0,
  //       password: '',
  //       city: '',
  //       country: '',
  //     };
  //   }
  //   this._modal.show();
  // }

  // saveOrUpdate() {
  //   if (this.userForm.id == 0) {
  //     this.userService.add(this.userForm).subscribe((_) => this._modal.hide());
  //   }
  // }
}
