// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { User } from 'src/app/shared/models/user';
// import { UserService } from 'src/app/shared/services/user/user.service';

// import { emailRegex } from 'src/app/shared/validators/email.validator';

// @Component({
//   selector: 'app-edit-profile',
//   templateUrl: './edit-profile.component.html',
//   styleUrls: ['./edit-profile.component.scss'],
// })
// export class EditProfileComponent implements OnInit {
//   //register$: Observable<RegisterCollection>;
//   profileForm!: FormGroup;
//   profile$!: Observable<User>;
//   isUpdated$!: Observable<boolean>;
//   //toastTrigger$ = new Subject<ToastMessage>();
//   //toastTrigger$ = new Subject<ToastMessage>();
//   maxMsgValidation!: string;

//   constructor(
//     private loginService: UserService,
//     private store: Store<ProfileState>,
//     private formBuilder: FormBuilder
//   ) {
//     this.profileForm = this.formBuilder.group({
//       name: [null, Validators.compose([Validators.required])],
//       email: [
//         null,
//         Validators.compose([
//           Validators.required,
//           Validators.pattern(emailRegex.email),
//         ]),
//       ],
//       adress: [null, Validators.compose([Validators.required])],
//     });
//     // this.register$ = this.store.pipe(select(registerCollectionSelector));
//     this.profile$ = this.store.pipe(select(profileSelector));
//     this.profile$.subscribe((res: any) => {
//       if (res) {
//         this.profileForm.get('name').patchValue(res.model.name);
//         this.profileForm.get('email').patchValue(res.model.email);
//         this.profileForm.get('adress').patchValue(res.model.adress);
//       }
//     });
//     this.isUpdated$ = this.store.pipe(select(isUpdateSelector));
//   }

//   ngOnInit(): void {
//     this.isUpdatedSub = this.isUpdated$.subscribe((res) => {
//       if (res) {
//         this.openConfirmDialog();
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     this.isUpdatedSub.unsubscribe();
//   }
// }
