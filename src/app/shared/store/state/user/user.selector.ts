// import { AppState } from './user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Roles } from 'src/app/shared/constants/constants';
import { UserState } from './user.reducer';

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

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserDetails = createSelector(
  selectUserState,
  (user) => user?.userDetails
);

export const selectIsLoggedIn = createSelector(
  selectUserDetails,
  (userDetails) => !!userDetails
);

function canAccess(user: UserState, roles: string[]): boolean {
  let grantedAccess = false;

  for (const role of roles) {
    if (user?.userDetails && user?.userDetails?.code?.includes(role)) {
      grantedAccess = true;
      break;
    }
  }
  return grantedAccess;
}

export const adminAccess = createSelector(selectUserState, (user) => {
  return canAccess(user, [Roles.ADMIN, Roles.FRANCHISEE]);
});

export const franchiseeAccess = createSelector(selectUserState, (user) => {
  return canAccess(user, [Roles.FRANCHISEE]);
});
