import { User } from 'src/app/shared/models/user.model';

/**
 * Defining the interface for the user state object and its initial state
 */

export interface UserState {
  userDetails?: User;
}

export const initialState: UserState = {
  userDetails: undefined,
};
