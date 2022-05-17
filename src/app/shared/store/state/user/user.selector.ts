import { UserState } from './user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Roles } from 'src/app/shared/constants/constants';

/**
 * Feature selector
 * and
 * a selector that returns the userDetails
 *
 * access these properties :
 *  - isLoggedIn,
 *  - canAccess,
 *  - adminAccess | franchiseeAccess
 */

export const selectUserState = createFeatureSelector<UserState>('auth');

export const selectUserDetails = createSelector(
  selectUserState,
  (state: UserState) => state.userDetails
);

export const selectIsLoggedIn = createSelector(
  selectUserDetails,
  (userDetails) => !!userDetails
);

function canAccess(auth: UserState, roles: string[]): boolean {
  let grantedAccess = false;

  for (const role of roles) {
    if (auth?.userDetails && auth?.userDetails?.roles?.includes(role)) {
      grantedAccess = true;
      break;
    }
  }
  return grantedAccess;
}

export const adminAccess = createSelector(selectUserState, (auth) => {
  return canAccess(auth, [Roles.ADMIN]);
});

export const franchiseeAccess = createSelector(selectUserState, (auth) => {
  return canAccess(auth, [Roles.ADMIN, Roles.FRANCHISEE]);
});
