import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/store/reducers';
import * as ForgotPasswordActions from '../../store/actions/resetpw.actions';

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.scss']
})
export class ResetpwComponent implements OnInit, OnDestroy {
  
  forgotPasswordSubs: Subscription = new Subscription;
  forgotPasswordForm?: FormGroup;
  isSubmitting?: Observable<boolean>;
  
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ForgotPasswordActions.ResetForgotPasswordState());

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.forgotPasswordSubs = this.store
      .select('forgotPassword')
      .subscribe((state) => {
        this.loading = state.loading;

        if (state.success) {
          this.forgotPasswordForm.setValue({ email: '' });
          this.openSnakBar(state.message, 'X', 'success-snackbar');
        }

        if (state.error) {
          this.openSnakBar(state.message, 'X', 'error-snackbar');
        }
      });
  }

  ngOnDestroy(): void {
    this.forgotPasswordSubs.unsubscribe();
  }

  sendPasswordResetEmail(): void {
    if (this.forgotPasswordForm.invalid) return;

    this.store.dispatch(
      ForgotPasswordActions.SendPasswordResetEmail({
        email: this.forgotPasswordForm.get('email').value,
      })
    );
  }

  openSnakBar(message: string, action: string, clazz: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [clazz],
    });
  }
}
