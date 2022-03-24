import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

// export const SendPasswordResetEmail = createAction(
//   '[Auth] Send password reset email',
//   props<{ email: string }>()
// );
// export const SendPasswordResetEmailSuccess = createAction(
//   '[Auth] Send password reset email successfully'
// );
// export const SendPasswordResetEmailFailed = createAction(
//   '[Auth] Send password reset email failed',
//   props<{ message: string }>()
// );

// export const ResetForgotPasswordState = createAction(
//   '[Auth] Reset state forgot password'
// );

export const forgotPasswordAction = createAction(
  '[Auth] Send password reset email',
  props<{ email: string }>());

export const forgotPasswordSuccessAction = createAction(
  '[Auth] Send password reset email successfully');

export const forgotPasswordFailureAction = createAction(
  '[Auth] Send password reset email failed',
  props<{ message: string }>());