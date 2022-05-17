import { UserState } from './user';

/**
 * To access 'UserState' from your Store, need to add it to 'storeState' object
 */
export interface State {
  user: UserState;
}
