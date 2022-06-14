import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import * as UserActions from './user.actions';
// import { initialState } from './user.state';

/**
 * @Reducer handle transitions from one state to the next state
 * by determining which actions to handle based on the action's type.
 */

/**
 * Defining the interface for the user state object and its initial state
 */
export const userFeatureKey = 'user';

export interface UserState {
  userDetails?: User;
}

export const initialState: UserState = {
  userDetails: undefined,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userLoaded, (state, action) => {
    return {
      ...state,
      userDetails: action.userDetails,
    };
  })
);

// export const userReducer = createReducer(
//   initialState,

//   on(UserActions.userLoaded, (state, action) => ({
//     ...state,
//     userDetails: action.userDetails,
//   }))
// );

// export function reducer(state: AppState | undefined, action: Action) {
//   return userReducer(state, action);
// }
