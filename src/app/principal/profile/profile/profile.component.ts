import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter, first } from "rxjs";
import { select, Store } from "@ngrx/store";
import { MessageService } from "primeng/api";

import { User } from "src/app/shared/models/user.model";
import { AppState } from "src/app/shared/store";
import { selectUserDetails, UserActions } from "src/app/shared/store/state/user";
import { AuthService } from "src/app/shared/services/auth/auth/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  providers: [MessageService],
  styleUrls: ["./profile.component.scss"],
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
  editModeFirstname: boolean;
  editModeLastname: boolean;
  editModeEmail: boolean;
  editModePhone: boolean;

  user: User;

  form: FormGroup;

  constructor(private store: Store<AppState>, private authService: AuthService, private fb: FormBuilder) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.editModeFirstname = false;
    this.editModeLastname = false;
    this.editModeEmail = false;
    this.editModePhone = false;

    this.init();
    this.initForm();
  }

  private init(): void {
    this.authService.getUser().subscribe((res) => {
      this.user = res;
      this.form.patchValue(this.user);
    });
  }

  /**
   * In input form : + Verify value form (character form and length)
   */
  private initForm(): void {
    this.form = this.fb.group({
      firstname: [this.user?.firstname, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastname: [this.user?.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      phone: [this.user?.phone, [Validators.required, Validators.pattern("/^[0][0-9]{9}$")]],
      email: [
        this.user?.email,
        [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(100)],
      ],
    });
  }

  updateField(type: string): User {
    this.store
      .pipe(
        select(selectUserDetails),
        filter((user) => user != null),
        first()
      )
      .subscribe({
        next: () => {
          const formValue = this.form.value;
          switch (type) {
            case "FIRSTNAME":
              this.user.firstname = formValue.firstname.trim();
              break;
            case "LASTNAME":
              this.user.lastname = formValue.lastname.trim();
              break;
            case "PHONE":
              this.user.phone = formValue.phone.trim();
              break;
            case "EMAIL":
              this.user.email = formValue.email.trim();
              break;
            default:
              break;
          }
          this.store.dispatch(UserActions.updateUser({ userDetails: this.user }));
        },
        error: (error): void => {
          console.log("error in update user : ", error);
        },
        complete: () => {
          console.info("complete");
        },
      });
    return this.user;
  }
}
