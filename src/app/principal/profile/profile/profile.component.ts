import { ProfileService } from './../../../shared/services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, filter, first } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AppState } from 'src/app/shared/store/state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  selectUserDetails,
  UserActions,
} from 'src/app/shared/store/state/user';

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
  editModeFirstname?: boolean;
  editModeLastname?: boolean;
  editModeEmail?: boolean;
  editModePhone?: boolean;

  user$?: Observable<User>;
  user: User;

  form: FormGroup;

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.init();
    this.createForm();

    this.user = this.profileService.getCurrentUser();
    //this.user = this.profileService.getUser();
    this.editModeFirstname = false;
    this.editModeLastname = false;
    this.editModeEmail = false;
    this.editModePhone = false;
  }

  private init(): void {
    this.user$ = this.store.pipe(select(selectUserDetails));
  }

  updateField(type: string): User {
    this.store
      .pipe(
        select(selectUserDetails),
        filter((user) => user != null),
        first()
      )
      .subscribe(
        (user) => {
          const formValue = this.form.value;
          switch (type) {
            case 'FIRSTNAME':
              this.user.firstname = formValue.firstname.trim();
              break;
            case 'LASTNAME':
              this.user.lastname = formValue.lastname.trim();
              break;
            case 'PHONE':
              this.user.phone = formValue.phone.trim();
              break;
            case 'EMAIL':
              this.user.email = formValue.email.trim();
              break;
            default:
              break;
          }
          this.store.dispatch(
            UserActions.updateUser({ userDetails: this.user })
          );
        },
        (error) => console.log('profile component > update user: ', error)
      );
    return this.user;
  }

  /**
   * In input form : + Verify value form (character form and length)
   */
  private createForm(): void {
    this.form = this.fb.group({
      firstname: [
        this.user.firstname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      lastname: [
        this.user.lastname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      phone: [
        this.user.phone,
        [Validators.required, Validators.pattern('/^[0][0-9]{9}$')],
      ],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  // TODO : *** code this part ***
  onFieldCancel(user: User, index: number) {}
}