import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

/**
 * User-related Actions that we need for our user Store. Logout,
 * and user changed Action to keep the user details in our Store in sync with Auth
 */

// export const logOutAction = {
//   logOutFlowInitiated: createAction('[Sidebar] logOut Flow Initiated'),
// };

export const loadUser = createAction('[Auth] Load User');

export const userLoaded = createAction(
  '[Load Auth Effect] User Loaded',
  props<{ userDetails: User }>()
);

export const updateUser = createAction(
  '[Profile Component] Update User',
  props<{ userDetails: User }>()
);

export const updateUserFirstname = createAction(
  '[Profile Component] Update Firstname',
  props<{ userDetails: User }>()
);

export const updateUserLastname = createAction(
  '[Profile Component] Update Lastname',
  props<{ userDetails: User }>()
);

export const updateUserPhone = createAction(
  '[Profile Component] Update Phone',
  props<{ userDetails: User }>()
);

export const updateUserEmail = createAction(
  '[Profile Component] Update Email',
  props<{ userDetails: User }>()
);
