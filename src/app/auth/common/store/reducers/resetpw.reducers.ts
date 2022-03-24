import { createReducer, on, Action } from '@ngrx/store';

import * as ForgotPasswordActions from '../actions/resetpw.actions';

export interface ForgotPasswordState {
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string | null;
}

export const forgotPasswordInitialState: ForgotPasswordState = {
  loading: false,
  success: false,
  error: false,
  message: null,
};

const _forgotPasswordReducer = createReducer(
  forgotPasswordInitialState,
  on(ForgotPasswordActions.SendPasswordResetEmail, (state) => ({
    ...state,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(ForgotPasswordActions.SendPasswordResetEmailSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
    error: false,
    message: 'SendPasswordResetEmailSuccess',
  })),
  on(
    ForgotPasswordActions.SendPasswordResetEmailFailed,
    (state, { message }) => ({
      ...state,
      email: null,
      loading: false,
      success: false,
      error: true,
      message: message,
    })
  ),
  on(
    ForgotPasswordActions.ResetForgotPasswordState,
    (state) => forgotPasswordInitialState
  )
);

export function forgotPasswordReducer(
  state: ForgotPasswordState,
  action: Action
) {
  return _forgotPasswordReducer(state, action);
}