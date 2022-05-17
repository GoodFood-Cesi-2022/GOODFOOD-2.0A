import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { initialState, UserState } from './user.state';

/**
 * @Reducer handle transitions from one state to the next state
 * by determining which actions to handle based on the action's type.
 */
const userReducer = createReducer(
  initialState,
  on(UserActions.userLoaded, (state, action) => ({
    ...state,
    userDetails: action.userDetails,
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
