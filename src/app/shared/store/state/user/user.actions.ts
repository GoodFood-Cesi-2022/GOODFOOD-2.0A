import { createAction, props } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";

/**
 * User-related Actions that we need for our user Store. Logout,
 * and user changed Action to keep the user details in our Store in sync with Auth
 */

export const loadUser = createAction("[Auth] Load User");

export const userLoaded = createAction("[Load Auth Effect] User Loaded", props<{ userDetails: User }>());

export const updateUser = createAction("[Auth Component] Update User", props<{ userDetails: User }>());

export const userUpdated = createAction("[Auth Component] User Updated", props<{ userDetails: User }>());
