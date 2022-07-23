import { createFeatureSelector, createSelector } from "@ngrx/store";

import { UserState } from "./user.reducer";

/**
 * Feature selector
 * and
 * a selector that returns the userDetails
 */

export const selectUserState = createFeatureSelector<UserState>("user");

export const selectUserDetails = createSelector(selectUserState, (user) => user.userDetails);

export const selectProfileUser = createSelector(selectUserDetails, (user) => {
  return { user };
});

export const selectIsLoggedIn = createSelector(selectUserDetails, (userDetails) => !!userDetails);
