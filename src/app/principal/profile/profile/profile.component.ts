import { ProfileService } from './../../../shared/services/profile/profile.service';
import { updateUser } from './../../../shared/store/state/user/user.actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/user/auth/auth.service';
import { AppState } from 'src/app/shared/store/state';
import { selectUserDetails } from 'src/app/shared/store/state/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  user$?: Observable<User | undefined>;
  editModeFirstname?: boolean;
  editModeLastname?: boolean;
  editModeEmail?: boolean;
  editModePhone?: boolean;

  form!: FormGroup;
  user?: User;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.user$ != new Observable<undefined>()) {
      this.user$ = this.store.pipe(
        select(selectUserDetails),
        tap((user) => (this.user = user))
      );
      console.log('profile component', this.user$);
    }
    // this.activateRoute.data.pipe(
    //   map((data) => {
    //     const user = data['user'];
    //     this.initForm(user);
    //   })
    // );

    this.editModeFirstname = false;
    this.editModeLastname = false;
    this.editModeEmail = false;
    this.editModePhone = false;

    this.initForm();
  }

  updateField(type: string): void {
    const formValue = this.form.value;
    console.log(type, formValue);
    //this.profileService.updateUser(formValue.firstname.trim() )
    switch (type) {
      case 'FIRSTNAME':
        //this.profileService.updateUser(this.form).pipe().subscribe(res=>this.)
        //console.log(this.form.get('firstname')?.setValue);
        //console.log('value first name : ', formValue);
        this.user$ = this.store.pipe(
          select(selectUserDetails),
          tap(
            (user) => (
              (this.user = user),
              (this.user!.firstname = formValue.firstname.trim())
            )
          )
        );
        this.profileService.updateUser(this.user$);

        break;
      case 'LASTNAME':
        //this.profileService.updateUser;
        console.log(this.form?.get('lastname')?.setValue);
        console.log(formValue);
        this.profileService.updateUser(formValue.lastname.trim());
        break;
      case 'PHONE':
        //this.profileService.updateUser;
        console.log(this.form?.get('phone')?.setValue);
        console.log(formValue);
        this.profileService.updateUser(formValue.phone.trim());
        break;
      case 'EMAIL':
        //this.profileService.updateUser;
        console.log(this.form?.get('email')?.setValue);
        console.log(formValue);
        this.profileService.updateUser(formValue.email.trim());
        break;
      default:
        break;
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstname: [
        this.user?.firstname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      lastname: [
        this.user?.lastname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      phone: [
        this.user?.phone,
        [Validators.required, Validators.pattern('/^[0][0-9]{9}$')],
      ],
      email: [
        this.user?.email,
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
